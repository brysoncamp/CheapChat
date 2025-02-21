import "./CitationsContainer.css";

const CitationsContainer = ({ citations }) => {

  const cleanCitation = (citation) => {
    const url = new URL(citation);
    let hostname = url.hostname;

    const parts = hostname.split('.');
    if (parts.length > 2) hostname = parts.slice(-2).join('.');

    return hostname;
  };

  return (
    <>
      {citations?.length > 0 && <div className="citations-container">
        {citations.map((citation, i) => (
          <a key={i} className="citation" href={citation} target="_blank" rel="noreferrer">
            <div className="citation-number">{i+1}</div>
            <div className="citation-text">{cleanCitation(citation)}</div>
          </a>
        ))}
      </div>}
    </>
  );
}

export default CitationsContainer;