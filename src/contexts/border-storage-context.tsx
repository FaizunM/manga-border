import { createContext, useState } from "react";
import { TBoundings } from "../components/molecules/image-canvas";

export interface IBorderStorageContext {
  storage: {
    filename: string;
    boundings: TBoundings[];
  }[];
  setStorage: React.Dispatch<
    React.SetStateAction<
      {
        filename: string;
        boundings: TBoundings[];
      }[]
    >
  >;
}

export const BorderStorageContext = createContext<IBorderStorageContext>({
  storage: [],
  setStorage: () => null,
});

interface IBorderStorageContextProvider {
  children: React.ReactNode;
}

export const BorderStorageContextProvider = ({
  children,
}: IBorderStorageContextProvider) => {
  const [storage, setStorage] = useState<
    {
      filename: string;
      boundings: TBoundings[];
    }[]
  >([]);

  return (
    <BorderStorageContext.Provider value={{ storage, setStorage }}>
      {children}
    </BorderStorageContext.Provider>
  );
};

