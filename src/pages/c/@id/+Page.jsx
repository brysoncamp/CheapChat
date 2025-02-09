import React, { useState, useEffect } from "react";
import { useData } from "vike-react/useData";

const Page = () => {
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") { 
      const lastPath = window.location.pathname.split('/').filter(Boolean).pop();
      setConversationId(lastPath); 
    }
  }, []);

  return (
    <div>
      <h1>Page ID: {conversationId || "Loading..."}</h1> {/* Show Loading until window exists */}
    </div>
  );
};

export default Page;
