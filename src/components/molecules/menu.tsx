import { IMenuItem, MenuItem } from "../atoms/menu-item";

interface IMenu {
  name: string;
  dropdown: boolean;
  action: () => void;
  items?: IMenuItem[];
  setMenuIndex: (release?: boolean) => void;
  showItem: boolean;
}

export const Menu = ({
  name,
  dropdown,
  action,
  items,
  showItem,
  setMenuIndex,
}: IMenu) => {
  return (
    <>
      {dropdown && items && showItem && (
        <div className="relative">
          <div className="absolute border-[1px] border-[rgba(255,255,255,0.05)] rounded-xl p-2 bg-[rgba(255,255,255,0.1)] top-5 left-0 w-[200px]">
            {items.map((item, index) => {
              return (
                <MenuItem
                  name={item.name}
                  action={item.action}
                  icon={item.icon}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      )}
      <div
        className="px-4 py-1 hover:bg-[rgba(255,255,255,0.05)] rounded-xl text-gray-400 hover:text-gray-700 transition-all duration-200 ease-in-out"
        onClick={() => {
          if (dropdown) {
            setMenuIndex();
          } else {
            action();
          }
        }}
      >
        {name}
      </div>
    </>
  );
};
