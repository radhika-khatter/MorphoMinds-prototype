import React, { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";

const WritingLevel2 = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);
  const [currentLetter, setCurrentLetter] = useState("A");

  const startDrawing = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    setIsDrawing(true);
    setLastPoint({ x, y });
  };

  const draw = (e: any) => {
    if (!isDrawing || !lastPoint || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx!.beginPath();
    ctx!.moveTo(lastPoint.x, lastPoint.y);
    ctx!.lineTo(x, y);
    ctx!.strokeStyle = "black";
    ctx!.lineWidth = 4;
    ctx!.lineCap = "round";
    ctx!.stroke();

    setLastPoint({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Responsive canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const size = Math.min(window.innerWidth * 0.9, 400);
      canvas.width = size;
      canvas.height = size;
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="p-4 flex-grow flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-purple-600 mb-2 text-center">
          Level 2: Write Letters Freely
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
          Write the selected letter — without a guide.
        </p>

        <div className="mb-4 flex flex-wrap gap-2 justify-center">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <button
              key={letter}
              onClick={() => {
                setCurrentLetter(letter);
                clearCanvas();
              }}
              className={`px-3 py-1 rounded-md border text-sm ${
                letter === currentLetter
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-600 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        <canvas
          ref={canvasRef}
          className="border-2 border-dashed border-purple-400 bg-white dark:bg-gray-800 rounded-xl"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        <button
          onClick={clearCanvas}
          className="mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Clear Canvas
        </button>
      </div>
    </div>
  );
};

export default WritingLevel2;
