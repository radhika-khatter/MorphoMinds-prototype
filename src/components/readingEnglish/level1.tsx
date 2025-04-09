import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const ReadingLevel1 = () => {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [recognizedLetter, setRecognizedLetter] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const recognitionRef = useRef<any>(null);
  const hasResult = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setIsProcessing(false);
      hasResult.current = false;
    };

    recognition.onresult = (event: any) => {
      hasResult.current = true;
      const transcript = event.results[0][0].transcript.trim().toUpperCase();
      setRecognizedLetter(transcript);
      setIsListening(false);
      setIsProcessing(false);

      if (transcript === selectedLetter) {
        setFeedback("✅ Correct!");
      } else {
        setFeedback(`❌ You said "${transcript}", try again.`);
      }

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    recognition.onerror = (e: any) => {
      setIsListening(false);
      setIsProcessing(false);
      setFeedback("⚠️ Error: " + e.error);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    recognition.onend = () => {
      if (!hasResult.current) {
        setIsListening(false);
        setIsProcessing(false);
        setFeedback("⚠️ No response detected. Try again.");
      }
    };

    recognitionRef.current = recognition;
  }, [selectedLetter]);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setFeedback(null);
    setRecognizedLetter(null);
    setIsListening(true);
    setIsProcessing(false);
    hasResult.current = false;

    recognitionRef.current.start();

    // Fallback timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!hasResult.current) {
        recognitionRef.current.stop(); // force stop
        setIsListening(false);
        setIsProcessing(false);
        setFeedback("⚠️ Took too long. Try again.");
      }
    }, 6000);
  };

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    setRecognizedLetter(null);
    setFeedback(null);
    setIsListening(false);
    setIsProcessing(false);
    if (recognitionRef.current) recognitionRef.current.abort();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Reading Practice - Level 1 (Letters)
      </h1>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className={`px-4 py-2 rounded border shadow transition ${
              selectedLetter === letter
                ? "bg-blue-200 border-blue-500"
                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {selectedLetter && (
        <div className="text-center mt-8">
          <p className="text-2xl mb-4">Say this letter:</p>
          <div className="text-6xl font-bold mb-4 text-purple-600">
            {selectedLetter}
          </div>

          <button
            onClick={startListening}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition mx-auto"
            disabled={isListening}
          >
            {isListening ? (
              <>
                <MicOff className="animate-pulse" />
                Listening...
              </>
            ) : isProcessing ? (
              <>
                <Loader2 className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Mic />
                Start Speaking
              </>
            )}
          </button>

          {feedback && (
            <div className="mt-6 text-xl font-semibold text-center text-gray-800 dark:text-white">
              {feedback}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReadingLevel1;
