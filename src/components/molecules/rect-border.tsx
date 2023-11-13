import { useState } from "react";
import { AppBar } from "../atoms/bars";
import { Button1 } from "../atoms/buttons";
import { AppContainer } from "../atoms/containers";
import { TBoundings } from "./image-canvas";

export const RectBorder = ({
  data,
  shown,
  setHighlightBorder,
  labels,
  updateLabel,
  currentIndex,
  updateCoords,
  removeBorder,
}: {
  data: TBoundings[];
  currentIndex: number | undefined;
  shown: boolean;
  setHighlightBorder: (index: number) => void;
  labels: string[];
  updateLabel: (index: number, labelIndex: number) => void;
  updateCoords: (itemIndex: number, effected: number, value: number) => void;
  removeBorder: (index: number) => void;
}) => {
  if (shown)
    return (
      <AppContainer>
        <AppBar>
          <div className="text-medium mr-auto">Rect Borders</div>
          <Button1 action={() => {}} text="show" />
        </AppBar>
        <div className="p-4 flex flex-col gap-2">
          {data.length > 0 ? (
            data.map((item, index) => {
              return (
                <div
                  className={`w-full bg-[rgba(255,255,255,0.025)] p-2 rounded-lg text-gray-300 transition-all duration-200 ease-in-out flex flex-col gap-2 border-[1px] border-[rgba(255,255,255,0.02)]`}
                  key={index}
                  onClick={() => {
                    setHighlightBorder(index);
                  }}
                >
                  <div className="flex gap-2">
                    <div className="w-10 h-10 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <OptionSelector
                      itemIndex={index}
                      labels={labels}
                      labelsIndex={item.labelIndex}
                      updateLabel={updateLabel}
                    />
                  </div>
                  {currentIndex === index && (
                    <CoordinateControl
                      x1={item.x1}
                      y1={item.y1}
                      x2={item.x2}
                      y2={item.y2}
                      updateCoords={updateCoords}
                      itemIndex={index}
                    />
                  )}
                  {currentIndex === index && (
                    <div
                      className="w-full h-10 bg-blue-500 hover:bg-blue-600 transition-all duration-200 ease-in-out rounded-lg flex items-center justify-center text-gray-200 "
                      onClick={() => removeBorder(index)}
                    >
                      Delete
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="w-full h-[100px] flex items-center justify-center">
              No border list
            </div>
          )}
        </div>
      </AppContainer>
    );
};

const CoordinateControl = ({
  x1,
  y1,
  x2,
  y2,
  itemIndex,
  updateCoords,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  itemIndex: number;
  updateCoords: (itemIndex: number, effected: number, value: number) => void;
}) => {
  return (
    <div className="w-full">
      {[
        [
          { axisIndex: 0, value: x1 },
          { axisIndex: 1, value: y1 },
        ],
        [
          { axisIndex: 2, value: x2 },
          { axisIndex: 3, value: y2 },
        ],
      ].map((row, index) => {
        return (
          <div className="grid grid-cols-2 gap-2 mt-2" key={index}>
            {row.map((item, index) => {
              return (
                <div
                  className="col-span-1 bg-[rgba(255,255,255,0.1)] rounded-lg border-2 border-[rgba(255,255,255,0.05)] p-1 flex gap-1 items-center"
                  key={index}
                >
                  <ControlButton
                    icon={<i className="fa-light fa-chevron-left"></i>}
                    onClick={() => {
                      updateCoords(itemIndex, item.axisIndex, item.value - 1);
                    }}
                  />
                  <div className="w-auto mx-auto text-ellipsis line-clamp-1">
                    {item.value}
                  </div>
                  <ControlButton
                    icon={<i className="fa-light fa-chevron-right"></i>}
                    onClick={() => {
                      updateCoords(itemIndex, item.axisIndex, item.value + 1);
                    }}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const ControlButton = ({
  icon,
  onClick,
}: {
  icon: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      className="w-8 h-8 flex items-center justify-center hover:bg-[rgba(255,255,255,0.025)] rounded-md"
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

const OptionSelector = ({
  itemIndex,
  labels,
  labelsIndex,
  updateLabel,
}: {
  itemIndex: number;
  labels: string[];
  labelsIndex: number;
  updateLabel: (index: number, labelIndex: number) => void;
}) => {
  const [showLabels, setShowLabels] = useState<boolean>(false);

  return (
    <div className="w-full hover:bg-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] rounded-lg relative">
      <div
        className="w-full h-10 flex items-center justify-center"
        onClick={() => setShowLabels((state) => !state)}
      >
        {labels[labelsIndex]}
      </div>
      {showLabels && (
        <div className="absolute w-full top-12 left-0 rounded-lg border-[2px] border-[rgba(255,255,255,0.02)] bg-[#282828] p-2 z-10">
          {labels.map((label, labelIndex) => {
            return (
              <div
                className="w-full h-10 flex items-center justify-center hover:bg-[rgba(255,255,255,0.02)] rounded-md"
                onClick={() => {
                  updateLabel(itemIndex, labelIndex);
                  setShowLabels(false);
                }}
                key={labelIndex}
              >
                {label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
