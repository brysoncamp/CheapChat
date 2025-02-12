import openaiUrl from "../../assets/providers/openai.svg";
import perplexityUrl from "../../assets/providers/perplexity.svg";
import "./ProviderLogo.css";

const ProviderLogo = ({ provider, horizontalMargins = false }) => {

  const providerLogos = {
    OpenAI: openaiUrl,
    Perplexity: perplexityUrl
  };

  const providerClassNames = {
    OpenAI: "openai-logo",
    Perplexity: "perplexity-logo"
  };

  return (
    <img className={`${horizontalMargins ? "horizontal-margins" : ""} ${providerClassNames[provider]}`} src={providerLogos[provider]} alt={provider} draggable="false" />
  )
};

export default ProviderLogo;