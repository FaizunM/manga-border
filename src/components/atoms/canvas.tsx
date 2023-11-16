import { LegacyRef } from "react";

export const Canvas = ({
  canvasRef,
  onMouseMove,
  onMouseDown,
  onMouseUp,
}: {
  canvasRef: LegacyRef<HTMLCanvasElement> | undefined;
  onMouseMove: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  onMouseDown: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  onMouseUp: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
}) => {
  return (
    <div className="w-full flex items-center justify-center overflow-scroll scroll-smooth">
      <canvas
        ref={canvasRef}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      ></canvas>
    </div>
  );
};