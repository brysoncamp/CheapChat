import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles
import CodeBlock from "../CodeBlock/CodeBlock";

import "./RenderMarkdown.css";

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

const RenderMarkdown = ({ text, citations, isLoading }) => {
  // Default components
  let markdownComponents = {
    pre: CodeBlock,
    a: ({ node, ...props }) => (
      <a {...props} target="_blank" rel="noopener noreferrer" />
    ),
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

  return (
    <div>
      <ReactMarkdown
        children={text}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={markdownComponents}
      />
      {isLoading && <span className="loading-circle"></span>}
    </div>
  );
};

export default RenderMarkdown;
