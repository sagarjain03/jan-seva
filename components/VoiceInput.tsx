"use client"; // Only if using App Router

import { useState } from "react";

const VoiceInput: React.FC = () => {
  const [text, setText] = useState("");

  const startDictation = () => {
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
      const result = event.results[0][0].transcript;
      setText(result);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
    };
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={startDictation}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        🎤 Speak Now
      </button>
      <input
        type="text"
        className="border border-gray-300 p-2 rounded"
        placeholder="Your voice will appear here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default VoiceInput;
