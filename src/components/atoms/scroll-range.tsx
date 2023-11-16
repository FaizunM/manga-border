import { FormEvent, useState } from "react";

export const ScaleRange = ({
  scale,
  setScale,
}: {
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [step] = useState<number>(0.01);
  return (
    <div className="flex gap-4 items-center">
      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[rgba(255,255,255,0.025)] hover:bg-[rgba(255,255,255,0.05)] active:bg-[rgba(255,255,255,0.075)]" onClick={() => {
        setScale(state => state - step)
      }}>
        <i className="fa-light fa-minus"></i>
      </div>
      <div className="w-[250px] flex items-center">
        <input
          id="small-range"
          type="range"
          min={0.25}
          value={scale}
          max={1.75}
          defaultValue={1}
          step={step}
          onInput={(e: FormEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            setScale(Number(target.value));
          }}
          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
        />
      </div>
      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[rgba(255,255,255,0.025)] hover:bg-[rgba(255,255,255,0.05)] active:bg-[rgba(255,255,255,0.075)]" onClick={() => {
        setScale(state => state + step)
      }}>
        <i className="fa-light fa-plus"></i>
      </div>
    </div>
  );
};
