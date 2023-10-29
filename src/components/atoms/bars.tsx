export const AppBar = ({
  children,
  width,
}: {
  children: React.ReactNode;
  width?: string;
}) => {
  return (
    <div
      className={`${width} p-4 flex items-center border-b-[1px] border-[rgba(0,0,0,0.1)] gap-2 flex-wrap`}
    >
      {children}
    </div>
  );
};
