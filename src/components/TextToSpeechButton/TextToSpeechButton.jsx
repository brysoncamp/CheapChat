import { useState, useEffect, useRef } from "react";

import soundUrl from "./sound.svg";
import stopCircleUrl from "./stop-circle.svg";

const TextToSpeechButton = ({ text, isSpeaking, setIsSpeaking }) => {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const utteranceRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (!availableVoices.length) return;

      console.log("Available voices:", availableVoices);

      const preferredVoice =
        availableVoices.find(v => v.name === "Microsoft Ryan Online (Natural) - English (United Kingdom)") ||
        availableVoices.find(v => v.name === "Google UK English Male") ||
        availableVoices.find(v => v.name === "Microsoft George - English (United Kingdom)") ||
        availableVoices.find(v => v.lang === "en-GB") || // Any UK English voice
        availableVoices[0]; // Fallback to first available voice

      setSelectedVoice(preferredVoice);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Cancel speech in case the component unmounts in a SPA scenario
    return () => {
      console.log("Cleaning up on unmount");
      window.speechSynthesis.cancel();
      clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  /**
   * Add extra listeners for page refresh or navigation away:
   * - 'beforeunload' handles typical refresh scenarios.
   * - 'pagehide' for mobile Safari / iOS devices.
   * - 'visibilitychange' for scenarios where page is hidden in background.
   */
  useEffect(() => {
    const handleUnload = () => {
      window.speechSynthesis.cancel();
    };

    const handlePageHide = () => {
      window.speechSynthesis.cancel();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        window.speechSynthesis.cancel();
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("pagehide", handlePageHide);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("pagehide", handlePageHide);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  /**
   * Continuously calls `speechSynthesis.resume()` to prevent the audio
   * from being auto-paused on some browsers.
   */
  const resumeInfinity = () => {
    console.log("Resuming speech to avoid auto-pause...");
    window.speechSynthesis.pause();  // "Kick" the synth
    window.speechSynthesis.resume(); // then resume
    resumeTimeoutRef.current = setTimeout(resumeInfinity, 5000);
  };

  const speak = () => {
    if (!window.speechSynthesis || !selectedVoice) {
      alert("No available voices found.");
      setIsSpeaking(false);
      return;
    }

    console.log("Starting speech...");
    setIsSpeaking(true); // Provide immediate UI feedback

    // Cancel any currently playing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    utterance.voice = selectedVoice;
    utterance.pitch = 1;
    utterance.rate = 1;

    utterance.onstart = () => {
      console.log("Speech actually started with:", selectedVoice.name);
      resumeInfinity();
    };

    utterance.onend = () => {
      console.log("Speech finished.");
      setIsSpeaking(false);
      clearTimeout(resumeTimeoutRef.current);
    };

    utterance.onerror = (err) => {
      console.error("Speech synthesis error:", err);
      setIsSpeaking(false);
      clearTimeout(resumeTimeoutRef.current);
    };

    // Finally, speak
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeak = () => {
    if (!isSpeaking) {
      speak();
    } else {
      console.log("Stopping speech.");
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      clearTimeout(resumeTimeoutRef.current);
    }
  };

  return (
    <div className="message-button unselectable" onClick={handleSpeak}>
      <img
        src={isSpeaking ? stopCircleUrl : soundUrl}
        style={{ height: isSpeaking ? "1.25rem" : "1.375rem" }}
        alt="Sound"
        draggable="false"
      />
    </div>
  );
};

export default TextToSpeechButton;
