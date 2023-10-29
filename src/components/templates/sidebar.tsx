export const Sidebar = ({ collapse }: { collapse: boolean }) => {
  return (
    <div
      className={`${
        collapse && "w-[250px]"
      } h-screen border-r-[1px] border-[rgba(0,0,0,0.05)] p-4`}
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 flex items-center justify-center">
          <i className="fa-brands fa-instagram"></i>
        </div>
        {collapse && <div className="font-medium">APP NAME</div>}
      </div>
      <div className="flex flex-col mt-4">
        {[
          {
            name: "Home",
            icon: <i className="fa-light fa-house"></i>,
            route: "/",
          },
          {
            name: "Browse",
            icon: <i className="fa-light fa-earth"></i>,
            route: "/",
          },
        ].map((item, index) => {
          return (
            <div
              className="w-full transition-all duration-200 ease-in-out rounded-md flex items-center gap-2 hover:bg-[rgba(0,0,0,0.025)] text-gray-500 hover:text-gray-700"
              key={index}
            >
              <div className="w-10 h-10 flex items-center justify-center">
                {item.icon}
              </div>
              {collapse && <div className="">{item.name}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
