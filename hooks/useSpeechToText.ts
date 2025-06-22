import { useCallback } from "react";

export function useSpeechToText() {
  const startDictation = useCallback((onResult: (text: string) => void) => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let result = event.results[0][0].transcript;
     
      result = result.replace(/[.,!?]$/, "").trim();
      onResult(result);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
    };
  }, []);

  return startDictation;
}