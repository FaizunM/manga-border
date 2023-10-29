import { Sidebar } from "../templates/sidebar";

export const ContentLayout = ({
  children,
  sidebarState,
}: {
  children: React.ReactNode;
  sidebarState: boolean;
}) => {
  return (
    <div className="flex gap-8">
      <div className="">
        <Sidebar collapse={sidebarState} />
      </div>
      <div className="w-full overflow-y-scroll h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
};
