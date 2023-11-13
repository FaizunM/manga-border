import React from "react";

interface ILabelInput extends HTMLElement {
  value: string;
}

export const LabelView = ({
  value,
  isDefault,
  onLabelChange,
  onSwitch,
  onRemove,
}: {
  value: string;
  isDefault: boolean;
  onLabelChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSwitch: () => void;
  onRemove: () => void;
}) => {
  return (
    <div className="h-[10] p-1 rounded-md border-[1px] border-[rgba(255,255,255,0.05)] text-sm flex gap-1">
      <InputText
        name="label"
        id="label"
        placeholder="Label name"
        value={value}
        onChange={onLabelChange}
      />
      <SwitchButton
        state={isDefault}
        textOn="default"
        textOff="select"
        onClick={onSwitch}
      />
      <Button onClick={onRemove}>
        <i className="fa-light fa-x"></i>
      </Button>
    </div>
  );
};

const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      className="h-8 w-8 flex items-center justify-center hover:bg-[rgba(255,255,255,0.025)] rounded-md text-sm"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const SwitchButton = ({
  state,
  textOn,
  textOff,
  onClick,
}: {
  state: boolean;
  textOn: string;
  textOff: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={`px-3 h-8 flex items-center justify-center hover:bg-[rgba(255,255,255,0.025)] rounded-md text-sm`}
      onClick={onClick}
    >
      {state ? textOn : textOff}
    </div>
  );
};

export const NewLabelForm = ({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const handleNew = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (form.get("label-name") === "") return;
    setState((state) => [...state, String(form.get("label-name"))]);
    const labelInput = document.getElementById("label-input") as ILabelInput;
    labelInput.value = "";
  };

  return (
    <form onSubmit={handleNew}>
      <FormArea>
        <InputText
          name="label-name"
          id="label-input"
          placeholder="New label name"
        />
        <SubmitButton>
          <i className="fa-light fa-plus"></i>
        </SubmitButton>
      </FormArea>
    </form>
  );
};

const FormArea = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[10] p-1 rounded-md border-[1px] border-[rgba(255,255,255,0.05)] text-sm flex gap-1">
      {children}
    </div>
  );
};

const InputText = ({
  name,
  value,
  placeholder,
  id,
  onChange,
}: {
  name: string;
  value?: string;
  placeholder: string;
  id: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      className="h-8 w-[100px] rounded-md bg-[rgba(255,255,255,0.02)] px-2 outline-none"
      onChange={onChange}
      value={value}
      id={id}
    />
  );
};

const SubmitButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      type="submit"
      className="h-8 w-8 flex items-center justify-center hover:bg-[rgba(255,255,255,0.025)] rounded-md text-sm"
    >
      {children}
    </button>
  );
};
