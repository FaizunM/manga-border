export const CanvasName = ({ text }: { text: string }) => {
  return (
    <div className="w-[86px] flex items-center justify-center text-medium line-clamp-1 text-ellipsis">
      {text}
    </div>
  );
};
export const CanvasMousePosition = ({ mousePos }: { mousePos: number[] }) => {
  return (
    <div className="min-w-[100px] w-[100px] px-4 flex gap-2 items-center text-medium">
      <div className="flex">X:{mousePos[0].toFixed(0)}</div>
      <div className="flex">Y:{mousePos[1].toFixed(0)}</div>
    </div>
  );
};
