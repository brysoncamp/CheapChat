import { useState, useRef } from "react";

const useCopyToClipboard = (timeout = 2000) => {
    const [isCopied, setIsCopied] = useState(false);
    const timeoutRef = useRef(null); // Store timeout ID

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setIsCopied(true);
                
                // Clear previous timeout if exists
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                // Set a new timeout and store the ID
                timeoutRef.current = setTimeout(() => {
                    setIsCopied(false);
                    timeoutRef.current = null; // Reset ref
                }, timeout);
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };

    return { isCopied, copyToClipboard };
};

export default useCopyToClipboard;