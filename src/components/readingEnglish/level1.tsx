// components/readingEnglish/level1.tsx
import { useState, useEffect, useRef } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const ReadingLevel1 = () => {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [recognizedLetter, setRecognizedLetter] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript.trim().toUpperCase();
      setRecognizedLetter(transcript);
      if (transcript === selectedLetter) {
        setFeedback("✅ Correct!");
      } else {
        setFeedback(`❌ You said "${transcript}", try again.`);
      }
    };

    recognition.onerror = (e) => {
      setFeedback("⚠️ Error: " + e.error);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setFeedback(null);
    recognitionRef.current.start();
  };

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    setRecognizedLetter(null);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Reading Practice - Level 1 (Letters)</h1>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border rounded shadow hover:bg-blue-100 dark:hover:bg-blue-900 transition"
          >
            {letter}
          </button>
        ))}
      </div>

      {selectedLetter && (
        <div className="text-center mt-8">
          <p className="text-2xl mb-4">Say this letter:</p>
          <div className="text-6xl font-bold mb-4 text-purple-600">{selectedLetter}</div>

          <button
            onClick={startListening}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            🎤 Start Speaking
          </button>

          {feedback && (
            <div className="mt-6 text-xl font-semibold text-center">
              {feedback}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReadingLevel1;
