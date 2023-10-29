export const CanvasName = ({ text }: { text: string }) => {
  return (
    <div className="w-[86px] flex items-center justify-center text-medium">
      {text}
    </div>
  );
};
export const CanvasMousePosition = ({ mousePos }: { mousePos: number[] }) => {
  return (
    <div className="px-4 flex items-center justify-center text-medium">
      X:{mousePos[0]} Y:{mousePos[1]}
    </div>
  );
};
