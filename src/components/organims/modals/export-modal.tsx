import { useState } from "react";

export const ExportModal = () => {
  const [exportOption] = useState(["CSV", "JSON", "YOLOv8"]);
  const [exportIndex, setExportIndex] = useState<number>(0);

  return (
    <div className="w-[400px] h-fit bg-[#282828] rounded-xl p-8">
      <div className="font-medium">Export</div>
      <form>
        <div className="w-full flex gap-2 mt-2">
          <input
            type="text"
            name="filename"
            placeholder="Filename"
            className="w-full border-[1px] border-[rgba(255,255,255,0.05)] px-3 rounded-xl outline-none"
          />
          <ExportSelect
            exportIndex={exportIndex}
            exportOption={exportOption}
            setExportIndex={(index) => setExportIndex(index)}
          />
        </div>
        <button
          type="submit"
          className="w-full h-11 mt-4 bg-blue-500 hover:bg-blue-600 transition-all duration-200 ease-in-out rounded-xl text-gray-200"
        >
          Export
        </button>
      </form>
    </div>
  );
};

const ExportSelect = ({
  exportOption,
  exportIndex,
  setExportIndex,
}: {
  exportOption: string[];
  exportIndex: number;
  setExportIndex: (index: number) => void;
}) => {
  const [showOption, setShowOption] = useState<boolean>(false);
  return (
    <div className="relative">
      <div className="w-[112px] border-[1px] border-[rgba(255,255,255,0.05)] p-2 rounded-xl">
        <OptionButton
          text={exportOption[exportIndex]}
          height="h-8"
          onClick={() => {
            setShowOption(true);
          }}
        />
      </div>
      {showOption && (
        <div className="absolute w-full top-14 p-2 bg-[rgba(255,255,255,0.1)] border-[1px] border-[rgba(255,255,255,0.05)] left-0 rounded-xl">
          {exportOption.map((item, index) => {
            return (
              <OptionButton
                text={item}
                height="h-12"
                onClick={() => {
                  setExportIndex(index);
                  setShowOption(false);
                }}
                key={index}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const OptionButton = ({
  text,
  height,
  onClick,
}: {
  text: string;
  height: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={`w-full ${height} hover:bg-[rgba(255,255,255,0.05)] rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all duration-200 ease-in-out`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};
