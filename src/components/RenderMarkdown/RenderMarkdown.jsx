
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles

import CodeBlock from "../CodeBlock/CodeBlock";

// this function may cause issues with some markdown content
const convertMathDelimiters = (text) => {
  return text
    // Convert block math from \[ ... \] → $$ ... $$
    .replace(/\\\[\s*([\s\S]+?)\s*\\\]/g, "\n$$\n$1\n$$\n")
    // Convert inline math from \( ... \) → $ ... $
    .replace(/\\\(\s*([\s\S]+?)\s*\\\)/g, "$$$1$$");
};

const RenderMarkdown = ({ text, isLoading }) => {
  const processedText = convertMathDelimiters(text);

  return (
    <div>
      <ReactMarkdown
        children={processedText}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          pre: CodeBlock,
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
        }}
      />
      {isLoading && <span className="loading-circle"></span>}
    </div>
  );
};

export default RenderMarkdown;
