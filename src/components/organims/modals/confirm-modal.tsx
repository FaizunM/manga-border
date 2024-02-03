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
    <div className="w-[400px] p-8 bg-[#282828] rounded-xl flex flex-col gap-4">
      <div className="text-center">{message}</div>
      <div className="grid grid-cols-2 gap-4">
        <div
          className="col-span-1 h-12 flex items-center justify-center hover:bg-[rgba(255,255,255,0.025)] rounded-xl"
          onClick={onNo}
        >
          Cancel
        </div>
        <div
          className="col-span-1 h-12 bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 rounded-xl"
          onClick={onYes}
        >
          Yes
        </div>
      </div>
    </div>
  );
};
