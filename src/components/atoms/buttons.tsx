import { MouseEventHandler } from "react";

export const Button1 = ({
  action,
  text,
}: {
  action: MouseEventHandler;
  text: string;
}) => {
  return (
    <div
      className="px-3 py-1 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200 ease-in-out text-gray-300 hover:text-white rounded-lg flex items-center justify-center"
      onClick={action}
    >
      {text}
    </div>
  );
};

export const ExportButton = ({
  shown,
  handleExport,
  setShownExport,
}: {
  shown: boolean;
  setShownExport: () => void;
  handleExport: (filename: string) => void;
}) => {
  return (
    <div className="flex bg-[rgba(255,255,255,0.02)] rounded-r-lg">
      <Button1 action={setShownExport} text={"Export"} />
      {shown && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            handleExport(String(form.get("filename")));
            setShownExport();
          }}
        >
          <input
            type="text"
            placeholder="Filename (csv)"
            name="filename"
            className="w-[124px] py-1 px-3 bg-transparent outline-none"
          />
        </form>
      )}
    </div>
  );
};
