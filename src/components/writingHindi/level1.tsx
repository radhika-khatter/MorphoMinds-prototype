import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";

const hindiLetters = [
  "अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ए", "ऐ", "ओ", "औ", "अं", "अः",
  "क", "ख", "ग", "घ", "ङ",
  "च", "छ", "ज", "झ", "ञ",
  "ट", "ठ", "ड", "ढ", "ण",
  "त", "थ", "द", "ध", "न",
  "प", "फ", "ब", "भ", "म",
  "य", "र", "ल", "व",
  "श", "ष", "स", "ह",
  "क्ष", "त्र", "ज्ञ"
];

const WritingHindiLevel1 = () => {
  const [selectedLetter, setSelectedLetter] = useState("क");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const drawDottedLetter = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "180px Arial";
    ctx.setLineDash([10, 10]);
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 2;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(selectedLetter, canvas.width / 2, canvas.height / 2);
    ctx.setLineDash([]);
  };

  useEffect(() => {
    drawDottedLetter();
  }, [selectedLetter]);

  const startDrawing = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0].clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0].clientY) - rect.top;
    isDrawing.current = true;
    lastPoint.current = { x, y };
  };

  const draw = (e: any) => {
    if (!isDrawing.current || !canvasRef.current || !lastPoint.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0].clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0].clientY) - rect.top;

    ctx!.beginPath();
    ctx!.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx!.lineTo(x, y);
    ctx!.strokeStyle = "black";
    ctx!.lineWidth = 4;
    ctx!.lineCap = "round";
    ctx!.stroke();

    lastPoint.current = { x, y };
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="p-6 flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold text-purple-600">Hindi Writing Level 1</h2>

        {/* Hindi Letter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 max-w-5xl">
          {hindiLetters.map((letter, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedLetter(letter)}
              className={`px-4 py-2 rounded-lg text-xl ${
                selectedLetter === letter
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Tracing Canvas */}
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="border border-gray-400 rounded-lg bg-white dark:bg-gray-800"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
    </div>
  );
};

export default WritingHindiLevel1;
