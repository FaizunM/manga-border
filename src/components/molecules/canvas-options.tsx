import { AppBar } from "../atoms/bars";
import { AppContainer } from "../atoms/containers";

type OptionT = {
  label: string;
  name: string;
  type: string;
  value: string | number;
};
type NewOption = { width: number; height: number };
export const CanvasOptions = ({
  options,
  saveCallback,
}: {
  options: OptionT[];
  saveCallback: (value: NewOption) => void;
}) => {
  return (
    <AppContainer>
      <AppBar>
        <div className="text-medium mr-auto">Options</div>
      </AppBar>
      <div className="p-4 flex flex-col gap-2">
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();

            const form = new FormData(e.currentTarget);
            const newoption: NewOption = {
              width: Number(form.get("width")),
              height: Number(form.get("height")),
            };
            saveCallback(newoption);
          }}
        >
          {options.map((item, index) => {
            return (
              <div className="flex flex-col rounded-md gap-2" key={index}>
                <div className="font-medium text-sm text-gray-400">
                  {item.label}
                </div>
                <input
                  type={item.type}
                  name={item.name}
                  defaultValue={item.value}
                  className="px-3 py-2 bg-[rgba(255,255,255,0.025)] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-200 ease-in-out outline-none rounded-md"
                />
              </div>
            );
          })}
          <button
            type="submit"
            className="w-full h-10 bg-blue-400 text-gray-100 rounded-md hover:bg-blue-500 transition-all duration-200 ease-in-out"
          >
            Save
          </button>
        </form>
      </div>
    </AppContainer>
  );
};
