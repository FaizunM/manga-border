import { useState } from "react";
import { Menu } from "../molecules/menu";
import { IMenuItem } from "../atoms/menu-item";

export const MenuBar = ({
  menus,
}: {
  menus: {
    name: string;
    dropdown: boolean;
    action: () => void;
    items: IMenuItem[];
  }[];
}) => {
  const [menuIndex, setMenuIndex] = useState<number>();

  return (
    <div className="w-full p-2 border-b-[1px] border-[rgba(0,0,0,0.1)] flex items-center fixed top-0 left-0 bg-white">
      {menus.map((item, index) => {
        return (
          <Menu
            name={item.name}
            showItem={menuIndex === index}
            setMenuIndex={() => {
              if (menuIndex === index) {
                setMenuIndex(undefined);
              } else {
                setMenuIndex(index);
              }
            }}
            action={item.action}
            dropdown={item.dropdown}
            items={item.items}
            key={index}
          />
        );
      })}
    </div>
  );
};
