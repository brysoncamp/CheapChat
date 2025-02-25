import React, { useMemo  } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles
import CodeBlock from "../CodeBlock/CodeBlock";
import { visit, SKIP } from "unist-util-visit";
import "./RenderMarkdown.css";

import ReasoningContent from "../ReasoningContent/ReasoningContent";

// Function to process <think> blocks in AST
const remarkThink = () => {
  return (tree) => {
    let insideThink = false;
    let accumulatedNodes = [];

    let mainParent = null;
    let thinkIndex = null;

    visit(tree, (node, index, parent) => {
      if (!node.value) return;

      let newValue = node.value;
      let outsideThink = false;

      if (newValue.startsWith("<think>") && !insideThink) {
        newValue = newValue.replace("<think>", "");
        insideThink = true;
      
        mainParent = parent;
        thinkIndex = index;

        console.log("starting think", newValue);
        //parent.children.splice(index, 1);
      }

      if (newValue.endsWith("</think>")) {
        newValue = newValue.replace("</think>", "");
        outsideThink = true;
      }

      if (insideThink) {
        accumulatedNodes.push({ type: "paragraph", children: [{ type: "text", value: newValue }] });
        node.value = "";

        mainParent.children[thinkIndex] = {
          type: "element",
          data: {
            hName: "div",
            hProperties: { className: "think-highlight" },
          },
          children: accumulatedNodes,
        };
      }

      if (outsideThink) {
        insideThink = false;
        accumulatedNodes = [];
        thinkIndex = null;
      }
    }); 
  };
};

// Regex to detect citations like [1] to [12]
const citationRegex = /\[(\d{1,2})\]/g;

// Function to process citations in text
const processCitationsInText = (citations, text) => {
  if (typeof text !== "string") return text;

  return text.split(citationRegex).map((part, index) => {
    if (index % 2 === 1 && part >= 1 && part <= 12) {
      return (
        <a key={index} className="citation-number-inline" href={citations[part - 1]} target="_blank" rel="noreferrer">
          {part}
        </a>
      );
    }
    return part;
  });
};

// List of all components that can contain text
const textContainingComponents = [
  "p", "h1", "h2", "h3", "h4", "h5", "h6",
  "li", "em", "strong", "blockquote", "td", "th"
];

const generateReasoningID = (() => {
  let idCounter = 0;
  return () => `reasoning-${idCounter++}`;
})();

const RenderMarkdown = ({ text, citations, isLoading }) => {
  let markdownComponents = {
    pre: CodeBlock,
    a: ({ node, ...props }) => (
      <a {...props} target="_blank" rel="noopener noreferrer" />
    ),
    div: ({ node, children, ...props }) => {
      const classList = node.properties?.className || [];

      if (classList.includes("think-highlight")) {
        // Generate a stable key using first child’s text if available
        const reasoningID  = generateReasoningID();

        return <ReasoningContent key={reasoningID} id={reasoningID} {...props}>{children}</ReasoningContent>;
      }

      return <div {...props}>{children}</div>;
    }
  };


  // If citations are enabled, modify text-containing components
  if (citations) {
    textContainingComponents.forEach((tag) => {
      markdownComponents[tag] = ({ node, children, ...props }) => {
        return React.createElement(tag, props, React.Children.map(children, (child) =>
          typeof child === "string" ? processCitationsInText(citations, child) : child
        ));
      };
    });
  }

  const memoizedMarkdown = useMemo(() => {
    return (
      <ReactMarkdown
        children={text}
        remarkPlugins={[remarkGfm, remarkMath, remarkThink]}
        rehypePlugins={[rehypeKatex]}
        components={markdownComponents}
      />
    );
  }, [text]);

  return (
    <div>
      {memoizedMarkdown}
      {isLoading && <span className="loading-circle"></span>}
    </div>
  );
};

export default RenderMarkdown;

// need to add to this code to look for the tags <think> and </think> when that happens it should create a specific span around htem