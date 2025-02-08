import { useEffect, useState } from "react";
import CopyCodeButton from "../CopyButton/CopyCodeButton";
import "./CodeBlock.css";
import { Highlight, themes } from "prism-react-renderer";

const CodeBlock = ({ children }) => {
  const [codeText, setCodeText] = useState(children?.props?.children || "");
  const language = children?.props?.className?.replace("language-", "") || "plaintext";

  useEffect(() => {
    setCodeText(children?.props?.children || ""); // ✅ Ensure dynamic updates
  }, [children]);

  return (
    <div className="code-block">
      <span className="code-block-language unselectable">{language}</span>
      <CopyCodeButton text={codeText} />
      <Highlight theme={themes.oneLight} code={codeText} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre style={{ ...style, backgroundColor: "transparent" }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
