import { useEffect, useState } from "react";

const useScrollManager = (bodyRef, messages, currentMessage) => {
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    const handleScroll = () => {
      const isNearBottom = body.scrollTop >= body.scrollHeight - body.clientHeight - 30;
      setIsUserAtBottom(isNearBottom);
    };

    body.addEventListener("scroll", handleScroll);
    return () => body.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isUserAtBottom && bodyRef.current) {
      bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, currentMessage]);
};

export default useScrollManager;
