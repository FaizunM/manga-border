import { TBoundings } from "./image-canvas";

const handleDownload = (
  data: {
    filename: string;
    boundings: TBoundings[];
  }[]
) => {
  var dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  var dlAnchorElem = document.createElement("a");
  dlAnchorElem.href = dataStr;
  dlAnchorElem.download = "dataset.json";
  dlAnchorElem.click();
};

export const ImportFile = ({
  handleFiles,
}: {
  handleFiles: (files: FileList) => void;
}) => {
  return (
    <label
      htmlFor="input-files"
      className="pr-4 rounded-xl bg-[rgba(255,255,255,0.01)] hover:bg-[rgba(255,255,255,0.03)] transition-all duration-200 ease-in-out flex items-center justify-center border border-[rgba(255,255,255,0.1)] text-gray-400"
      onDrop={(e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <div className="w-10 h-12 flex items-center justify-center">
        <i className="fa-light fa-file-import"></i>
      </div>
      <div className="font-medium text-sm px-4">Import</div>
    </label>
  );
};

export const ExportFile = ({
  data,
}: {
  data: {
    filename: string;
    boundings: TBoundings[];
  }[];
}) => {
  return (
    <div
      className="pr-4 rounded-xl bg-[rgba(255,255,255,0.01)] hover:bg-[rgba(255,255,255,0.03)] transition-all duration-200 ease-in-out flex items-center justify-center border border-[rgba(255,255,255,0.1)] text-gray-400"
      onClick={() => handleDownload(data)}
    >
      <div className="w-10 h-12 flex items-center justify-center">
        <i className="fa-light fa-file-export"></i>
      </div>
      <div className="font-medium text-sm px-4">Export</div>
    </div>
  );
};
