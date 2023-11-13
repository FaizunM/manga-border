export const AppBar = ({
  children,
  width,
}: {
  children: React.ReactNode;
  width?: string;
}) => {
  return (
    <div
      className={`${width} p-4 flex items-center border-b-[1px] border-[rgba(255,255,255,0.1)] gap-2 overflow-x-scroll`}
    >
      {children}
    </div>
  );
};
