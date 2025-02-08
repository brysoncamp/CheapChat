import CopyCodeButton from "../CopyButton/CopyCodeButton";
import "./CodeBlock.css";

const CodeBlock = ({ children }) => {  

  const codeText = children?.props?.children || "";
  const language = children?.props?.className?.replace("language-", "") || "plaintext";

  return (
      <pre className="code-block">
        <div className="code-block-language unselectable">{language}</div>
        <CopyCodeButton text={codeText} />
        {children}
      </pre>
  );

}

export default CodeBlock;