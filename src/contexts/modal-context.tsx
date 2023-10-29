import { createContext, useState } from "react";

export interface IModalContext {
  setModal: (modal: React.ReactNode) => void;
}

export const ModalContext = createContext<IModalContext>({
  setModal: () => null,
});

interface IModalContextProvider {
  children: React.ReactNode;
}

interface ITarget extends EventTarget {
  id: string;
}

export const ModalContextProvider = ({ children }: IModalContextProvider) => {
  const [modal, setModal] = useState<React.ReactNode>();

  return (
    <ModalContext.Provider value={{ setModal }}>
      {modal && (
        <div
          className="w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.05)] z-10 flex items-center justify-center"
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const target = e.target as ITarget;

            if (target.id === "modal-container") {
              setModal(null);
            }
            
          }}
          id="modal-container"
        >
          {modal}
        </div>
      )}
      {children}
    </ModalContext.Provider>
  );
};
