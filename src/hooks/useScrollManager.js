import { useEffect, useState } from "react";

let isScrollDisabled = false;
let bodyRefGlobal = null;

export const disableAutoScroll = () => {
  isScrollDisabled = true;
};

export const enableAutoScroll = () => {
  isScrollDisabled = false;
};

const useScrollManager = (bodyRef, messages, currentMessage) => {
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);

  useEffect(() => {
    bodyRefGlobal = bodyRef; // Store the bodyRef globally
  }, [bodyRef]);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    const handleScroll = () => {
      if (isScrollDisabled) return; // Prevent updating when scrolling is disabled
      const isNearBottom = body.scrollTop >= body.scrollHeight - body.clientHeight - 30;
      setIsUserAtBottom(isNearBottom);
    };

    body.addEventListener("scroll", handleScroll);
    return () => body.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isScrollDisabled && isUserAtBottom && bodyRef.current) {
      bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, currentMessage]);
};

export default useScrollManager;
