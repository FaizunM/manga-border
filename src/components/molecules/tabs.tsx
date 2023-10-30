export const TabContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full flex overflow-x-scroll">{children}</div>;
};

export const Tab = ({
  focus,
  saved,
  text,
  onClose,
  onClick,
}: {
  focus: boolean;
  saved: boolean;
  text: string;
  onClose: () => void;
  onClick: () => void;
}) => {
  return (
    <div
      className={`flex gap-2 ${
        focus && "border-b-2 border-[rgba(0,0,0,0.1)] text-black bg-[rgba(0,0,0,0.05)]"
      } hover:bg-[rgba(0,0,0,0.025)] items-center text-gray-500 transition-all duration-100 ease-in-out`}
      onClick={onClick}
    >
      <TabIcon
        color={saved ? "text-green-400" : "text-red-400"}
        icon={
          saved ? (
            <i className="fa-regular fa-circle-check"></i>
          ) : (
            <i className="fa-regular fa-circle-x"></i>
          )
        }
      />
      <Text text={text} />
      <Button icon={<i className="fa-light fa-xmark"></i>} onClick={onClose} />
    </div>
  );
};

const TabIcon = ({ icon, color }: { icon: React.ReactNode; color: string }) => {
  return (
    <div className={`w-10 h-10 flex items-center justify-center ${color}`}>
      {icon}
    </div>
  );
};

const Text = ({ text }: { text: string }) => {
  return <div className="w-[100px] text-ellipsis line-clamp-1 text-sm">{text}</div>;
};

const Button = ({
  icon,
  onClick,
}: {
  icon: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      className="w-6 h-6 flex items-center justify-center hover:bg-[rgba(0,0,0,0.05)] m-2 rounded-md transition-all duration-100 ease-in-out"
      onClick={onClick}
    >
      {icon}
    </div>
  );
};
