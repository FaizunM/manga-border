export const TabContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full flex overflow-hidden hover:overflow-x-scroll mb-2 hover:mb-1 pb-1">{children}</div>;
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
        focus &&
        "border-b-2 border-[rgba(255,255,255,0.1)] text-white bg-[rgba(255,255,255,0.05)] active:bg-[rgba(255,255,255,0.075)]"
      } hover:bg-[rgba(255,255,255,0.025)] items-center text-gray-300 transition-all duration-100 ease-in-out`}
      onClick={onClick}
    >
      <TabIcon
        color={'text-gray-400'}
        icon={
          saved ? (
            <i className="fa-regular fa-image"></i>
          ) : (
            <i className="fa-regular fa-image"></i>
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
    <div className={`w-10 h-12 flex items-center justify-center ${color}`}>
      {icon}
    </div>
  );
};

const Text = ({ text }: { text: string }) => {
  return (
    <div className="w-[100px] text-ellipsis line-clamp-1 text-sm">{text}</div>
  );
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
      className="w-6 h-6 flex items-center justify-center hover:bg-[rgba(255,255,255,0.05)] m-2 rounded-xl transition-all duration-100 ease-in-out"
      onClick={onClick}
    >
      {icon}
    </div>
  );
};
