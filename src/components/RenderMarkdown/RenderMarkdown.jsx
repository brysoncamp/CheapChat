import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeBlock from "../CodeBlock/CodeBlock";

const RenderMarkdown = ({ text }) => {
    return (
      <ReactMarkdown
        children={text}
        remarkPlugins={[remarkGfm]}
        components={{
          pre: CodeBlock
        }}
      />
    );
  };

export default RenderMarkdown;
