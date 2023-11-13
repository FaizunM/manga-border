export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full grid grid-cols-12 gap-8">{children}</div>;
};

export const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="col-span-9 h-fit rounded-lg border-[1px] border-[rgba(255,255,255,0.1)]">
      {children}
    </div>
  );
};

export const ColoumsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="col-span-3 flex flex-col gap-4">{children}</div>;
};
