import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";

const numbers = "0123456789".split("");

const WritingMathLevel1 = () => {
  const [selectedNumber, setSelectedNumber] = useState("0");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const drawDottedNumber = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "220px Arial";
    ctx.setLineDash([10, 10]);
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 2;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(selectedNumber, canvas.width / 2, canvas.height / 2);

    ctx.setLineDash([]); // Reset dash
  };

  useEffect(() => {
    drawDottedNumber();
  }, [selectedNumber]);

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

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDottedNumber(); // Redraw number
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="p-6 flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold text-purple-600">Math Writing Level 1</h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-xl text-center">
          Practice tracing numbers from 0 to 9 with dotted guides and handwriting practice.
        </p>

        <div className="flex flex-wrap gap-2 justify-center">
          {numbers.map((num) => (
            <button
              key={num}
              onClick={() => setSelectedNumber(num)}
              className={`px-4 py-2 rounded-lg ${
                selectedNumber === num
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="border border-gray-300 rounded-lg bg-white dark:bg-gray-800"
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
          className="mt-4 px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Clear Canvas
        </button>
      </div>
    </div>
  );
};

export default WritingMathLevel1;
