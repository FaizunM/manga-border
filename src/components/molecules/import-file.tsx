export const ImportFile = ({
  handleFiles,
}: {
  handleFiles: (files: FileList) => void;
}) => {
  return (
    <label
      htmlFor="input-files"
      className="pr-4 rounded-md bg-[rgba(255,255,255,0.01)] hover:bg-[rgba(255,255,255,0.03)] transition-all duration-200 ease-in-out flex items-center justify-center border border-[rgba(255,255,255,0.1)]     text-gray-400"
      onDrop={(e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <div className="w-10 h-10 flex items-center justify-center">
        <i className="fa-light fa-cloud"></i>
      </div>
      <div className="font-medium text-sm">Import</div>
    </label>
  );
};
