import openaiUrl from "../../assets/providers/openai.svg";
import perplexityUrl from "../../assets/providers/perplexity.svg";
import "./ProviderLogo.css";

const ProviderLogo = ({ provider, className }) => {

  const providerLogos = {
    OpenAI: openaiUrl,
    Perplexity: perplexityUrl
  };

  const providerClassNames = {
    OpenAI: "openai-logo",
    Perplexity: "perplexity-logo"
  };

  return (
    <img className={`${className} ${providerClassNames[provider]}`} src={providerLogos[provider]} alt={provider} draggable="false" />
  )
};

export default ProviderLogo;