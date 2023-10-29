export const ConfimModal = ({
  message,
  onNo,
  onYes,
}: {
  message: string;
  onNo: () => void;
  onYes: () => void;
}) => {
  return (
    <div className="w-[400px] p-8 bg-white rounded-lg flex flex-col gap-4">
      <div className="text-center">{message}</div>
      <div className="grid grid-cols-2 gap-4">
        <div
          className="col-span-1 h-10 flex items-center justify-center hover:bg-[rgba(0,0,0,0.025)] rounded-lg"
          onClick={onNo}
        >
          Cancel
        </div>
        <div
          className="col-span-1 h-10 bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 rounded-lg"
          onClick={onYes}
        >
          Yes
        </div>
      </div>
    </div>
  );
};
