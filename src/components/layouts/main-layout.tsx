import { useEffect } from "react";

export const MainLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <div className="w-full h-auto">{children}</div>;
};
