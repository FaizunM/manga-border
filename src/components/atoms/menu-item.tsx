export interface IMenuItem {
  name: string;
  action: () => void;
  icon: React.ReactNode;
}

export const MenuItem = ({ name, action, icon }: IMenuItem) => {
  return (
    <div
      className="w-full hover:bg-[rgba(255,255,255,0.025)] rounded-xl items-center gap-2 text-sm transition-all duration-200 ease-in-out flex"
      onClick={() => {
        action();
      }}
    >
      <div className="w-8 h-8 flex items-center justify-center">{icon}</div>
      {name}
    </div>
  );
};
