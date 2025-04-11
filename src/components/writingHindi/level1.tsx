import React, { useRef, useEffect, useState } from "react";

const WritingHindiLevel1 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    // Step 1: Fill letter (used for detection but also visible)
    ctx.font = "bold 150px 'Noto Sans Devanagari', sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText("अ", 100, 180);

    // Step 2: Outline (black)
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    ctx.strokeText("अ", 100, 180);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setLastPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPos) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;

    const isInsideWhiteLetter = r === 255 && g === 255 && b === 255 && a === 255;

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = isInsideWhiteLetter ? "green" : "red";
    ctx.lineWidth = 4;
    ctx.setLineDash([]);
    ctx.stroke();

    setLastPos({ x, y });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setLastPos(null);
  };

  return (
    <div>
      <h3>Trace the letter अ – Green if inside white area, Red if outside</h3>
      <canvas
        ref={canvasRef}
        style={{ border: "2px solid black", backgroundColor: "#ddd", touchAction: "none" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};

export default WritingHindiLevel1;
