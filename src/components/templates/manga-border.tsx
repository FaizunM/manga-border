import { ChangeEvent, useContext, useReducer, useState } from "react";
import { ImageCanvas } from "../molecules/image-canvas";
import { ImportFile } from "../molecules/import-file";
import { LabelView, NewLabelForm } from "../molecules/label";
import { Tab, TabContainer } from "../molecules/tabs";
import { IModalContext, ModalContext } from "../../contexts/modal-context";
import { ConfimModal } from "../organims/modals/confirm-modal";

export const MangaBorder = () => {
  const [images, setImages] = useState<File[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [labelsIndex, setLabelsIndex] = useState<number>(0);
  const [workspaceIndex, setWorkspaceIndex] = useState<number>(0);
  const { setModal } = useContext(ModalContext) as IModalContext;
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const getURLfromFile = (file: File) => {
    const url = window.URL.createObjectURL(file);
    return url;
  };

  const handleInputFile = (event: ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setImages([]);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file) continue;
      if (!file.type.startsWith("image/", 0)) continue;
      setImages((state) => [...state, file]);
    }
  };

  return (
    <div className="w-full p-8 flex flex-col gap-4">
      <div className="w-full border-[1px] border-[rgba(0,0,0,0.05)] rounded-lg p-4">
        <div className="font-medium">Labels</div>
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          {labels.map((item, index) => {
            return (
              <LabelView
                value={item}
                onLabelChange={(e) => {
                  labels[index] = e.target.value;
                }}
                isDefault={labelsIndex === index}
                onRemove={() => {
                  labels.splice(index, 1);
                  forceUpdate();
                }}
                onSwitch={() => {
                  setLabelsIndex(index);
                  forceUpdate();
                }}
                key={index}
              />
            );
          })}
          <NewLabelForm setState={setLabels} />
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-4">
        {images.length < 1 && <ImportFile handleFiles={handleFiles} />}
        <TabContainer>
          {images.map((item, index) => {
            return (
              <Tab
                focus={workspaceIndex === index}
                saved={true}
                text={item.name}
                onClose={() => {
                  setModal(
                    <ConfimModal
                      message={`Are you sure you want to delete ${item.name}? this cant be restore`}
                      onNo={() => {
                        setModal(undefined);
                      }}
                      onYes={() => {
                        images.splice(index, 1);
                        setModal(undefined);
                        forceUpdate();
                      }}
                    />
                  );
                }}
                onClick={() => {
                  setWorkspaceIndex(index);
                }}
                key={index}
              />
            );
          })}
        </TabContainer>
        {images.length > 0 &&
          images.map((item, index) => {
            if (workspaceIndex === index)
              return (
                <ImageCanvas
                  name={item.name}
                  url={getURLfromFile(item)}
                  labels={labels}
                  labelsIndex={labelsIndex}
                  key={index}
                />
              );
          })}
        <input
          type="file"
          id="input-files"
          hidden
          multiple
          onChange={handleInputFile}
        />
      </div>
    </div>
  );
};
