import { useEffect, useReducer, useRef, useState } from "react";
import { AppContainer, ColoumsContainer, Container } from "../atoms/containers";
import { AppBar } from "../atoms/bars";
import { CanvasMousePosition } from "../atoms/texts";
import { Button1 } from "../atoms/buttons";
import { RectBorder } from "./rect-border";
import { CanvasOptions } from "./canvas-options";
import { BoxRect } from "../atoms/box-rect";
import { ScaleRange } from "../atoms/scroll-range";
import { Canvas } from "../atoms/canvas";

export type TBoundings = {
  labelIndex: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export const ImageCanvas = ({
  filename,
  url,
  labels,
  labelsIndex,
  callback,
  saved,
}: {
  filename: string;
  url: string;
  labels: string[];
  labelsIndex: number;
  callback: (data: { filename: string; boundings: TBoundings[] }) => void;
  saved: { filename: string; boundings: TBoundings[] };
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [mousePos, setMousePos] = useState([0, 0]);
  const [mouseStart, setMouseStart] = useState<number[]>([0, 0]);
  const [isMouseClick, setIsMouseClick] = useState(false);
  const [controlTriggered, setControlTriggered] = useState<number>();
  const [boundings, setBoundings] = useState<TBoundings[]>(
    saved.boundings || []
  );
  const [highlightBorder, setHighlightBorder] = useState<number>(0);
  const [image, setImage] = useState<HTMLImageElement>();
  const [stateRender, forceRender] = useReducer((x) => x + 1, 0);
  const [shownRectBorderList, setShownRectBorderList] = useState<boolean>(true);
  const [imageSize, setImageSize] = useState<number[]>([0, 0]);
  const [boundingTriggered, setBoundingTriggered] = useState<number>();
  const [boundingSizeBuffer, setBoundingSizeBuffer] =
    useState<[number, number, number]>();
  const [scale, setScale] = useState<number>(1);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const pos = [
      (event.clientX - rect.left) / scale,
      (event.clientY - rect.top) / scale,
    ];
    setMousePos(pos);
  };

  useEffect(() => {
    callback({ filename: filename, boundings: boundings });
  }, [boundings]);

  const handleMouseDown = () => {
    if (!ready) return;
    setMouseStart(mousePos);
    setIsMouseClick(true);
  };

  const handleMouseUp = () => {
    if (!ready) return;
    const newBounding: TBoundings = {
      labelIndex: labelsIndex,
      x1: mouseStart[0],
      y1: mouseStart[1],
      x2: mousePos[0],
      y2: mousePos[1],
    };
    setIsMouseClick(false);
    if (boundingTriggered !== undefined) {
      setBoundingTriggered(undefined);
      setControlTriggered(undefined);
      setBoundingSizeBuffer(undefined);
      return;
    }
    if (boundingTriggered === undefined) {
      if (newBounding.x2 - newBounding.x1 < 8) return;
      if (newBounding.y2 - newBounding.y1 < 8) return;

      setBoundings((prev) => [...prev, newBounding]);
    }
  };

  useEffect(() => {
    if (!url) return;
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setImage(img);
      setImageSize([img.naturalWidth, img.naturalHeight]);
      setReady(true);
    };
  }, [image, url]);

  useEffect(() => {
    const renderFrame = () => {
      if (!image) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = imageSize[0] * scale;
      canvas.height = imageSize[1] * scale;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, imageSize[0] * scale, imageSize[1] * scale);
      ctx.strokeStyle = "black";

      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(0, mousePos[1] * scale);
      ctx.lineTo(canvas.width, mousePos[1] * scale);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(mousePos[0] * scale, 0);
      ctx.lineTo(mousePos[0] * scale, canvas.height);
      ctx.stroke();

      ctx.setLineDash([0, 0]);

      if (isMouseClick && boundingTriggered === undefined) {
        ctx.strokeRect(
          mouseStart[0] * scale,
          mouseStart[1] * scale,
          mousePos[0] * scale - mouseStart[0] * scale,
          mousePos[1] * scale - mouseStart[1] * scale
        );
      }

      boundings.forEach((item, itemIndex) => {
        const coords = item;
        const width = (item.x2 - item.x1) * scale;
        const height = (item.y2 - item.y1) * scale;
        const mousex = mousePos[0];
        const mousey = mousePos[1];

        const pos0 = [item.x1, item.y1];
        const pos1 = [item.x1, item.y2];
        const pos2 = [item.x2, item.y1];
        const pos3 = [item.x2, item.y2];

        if (
          mousex > pos0[0] &&
          mousex < pos0[0] + width &&
          mousey > pos0[1] &&
          mousey < pos0[1] + height
        ) {
          if (isMouseClick && boundingTriggered === undefined) {
            setHighlightBorder(itemIndex);
          }
        }

        const posts = [pos0, pos1, pos2, pos3];

        const centerBounding = [
          item.x1 + (item.x2 - item.x1) / 2,
          item.y1 + (item.y2 - item.y1) / 2,
        ];

        if (
          mousex > centerBounding[0] - 10 &&
          mousex < centerBounding[0] + 10 &&
          mousey > centerBounding[1] - 10 &&
          mousey < centerBounding[1] + 10
        ) {
          if (
            boundingSizeBuffer === undefined &&
            boundingTriggered === undefined &&
            isMouseClick
          ) {
            setBoundingSizeBuffer([width, height, itemIndex]);
            setBoundingTriggered(itemIndex);
          }
        }

        if (boundingTriggered === itemIndex && boundingSizeBuffer) {
          coords.x1 = mousex - boundingSizeBuffer[0] / 2;
          coords.y1 = mousey - boundingSizeBuffer[1] / 2;
          coords.x2 = mousex + boundingSizeBuffer[0] / 2;
          coords.y2 = mousey + boundingSizeBuffer[1] / 2;
        }

        posts.filter((num, index) => {
          if (
            mousex > num[0] - 10 &&
            mousex < num[0] + 10 &&
            mousey > num[1] - 10 &&
            mousey < num[1] + 10
          ) {
            if (
              isMouseClick &&
              boundingTriggered === undefined &&
              controlTriggered === undefined
            ) {
              setControlTriggered(index);
              setBoundingTriggered(itemIndex);
            }
          }
          if (boundingTriggered === itemIndex && controlTriggered === 0) {
            coords.x1 = mousePos[0];
            coords.y1 = mousePos[1];
          } else if (
            boundingTriggered === itemIndex &&
            controlTriggered === 1
          ) {
            coords.x1 = mousePos[0];
            coords.y2 = mousePos[1];
          } else if (
            boundingTriggered === itemIndex &&
            controlTriggered === 2
          ) {
            coords.x2 = mousePos[0];
            coords.y1 = mousePos[1];
          } else if (
            boundingTriggered === itemIndex &&
            controlTriggered === 3
          ) {
            coords.x2 = mousePos[0];
            coords.y2 = mousePos[1];
          }
        });

        const box = new BoxRect(
          ctx,
          `${itemIndex + 1} ${
            labels[item.labelIndex] ? labels[item.labelIndex] : "NO_LABEL"
          }`,
          [coords.x1, coords.y1, coords.x2, coords.y2],
          highlightBorder === itemIndex,
          controlTriggered,
          scale
        );
        box.controls();
        box.render();
        box.render_label();
      });
    };
    renderFrame();
  }, [
    image,
    mousePos,
    boundings,
    isMouseClick,
    mouseStart,
    highlightBorder,
    imageSize,
    stateRender,
    controlTriggered,
    labels,
    labelsIndex,
    boundingTriggered,
    boundingSizeBuffer,
    scale,
  ]);

  if (!ready) {
    return (
      <div className="w-full h-[400px] bg-[rgba(255,255,255,0.025)] rounded flex items-center justify-center">
        <div className="w-12 h-12 flex items-center justify-center text-6xl">
          <i className="fa-regular fa-spinner-third fa-spin"></i>
        </div>
      </div>
    );
  } else
    return (
      <Container>
        <AppContainer>
          <AppBar>
            {[
              {
                name: shownRectBorderList ? "Hide Rect" : "Show Rect",
                action: () => setShownRectBorderList((state) => !state),
              },
              {
                name: "Reset",
                action: () => {
                  setBoundings([]);
                },
              },
              {
                name: "Save",
                action: () => {},
              },
              {
                name: "Options",
                action: () => {},
              },
            ].map((item, index) => {
              return (
                <Button1 action={item.action} text={item.name} key={index} />
              );
            })}
            <ScaleRange scale={scale} setScale={setScale} />
            <CanvasMousePosition mousePos={mousePos} />
          </AppBar>
          <Canvas
            canvasRef={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          />
        </AppContainer>
        <ColoumsContainer>
          <RectBorder
            data={boundings}
            currentIndex={highlightBorder}
            shown={shownRectBorderList}
            setHighlightBorder={(index: number) => {
              setHighlightBorder(index);
            }}
            removeBorder={(index: number) => {
              const arr = boundings;
              arr.splice(index, 1);
              setBoundings(arr);
              forceRender();
            }}
            updateLabel={(index: number, labelIndex: number) => {
              boundings[index].labelIndex = labelIndex;
              forceRender();
            }}
            updateCoords={(itemIndex, effected, value) => {
              if (effected === 0) {
                boundings[itemIndex].x1 = value;
              }
              if (effected === 1) {
                boundings[itemIndex].y1 = value;
              }
              if (effected === 2) {
                boundings[itemIndex].x2 = value;
              }
              if (effected === 3) {
                boundings[itemIndex].y2 = value;
              }
              forceRender();
            }}
            labels={labels}
          />
          {image && (
            <CanvasOptions
              options={[
                {
                  label: "Width",
                  name: "width",
                  type: "number",
                  value: image.width,
                },
                {
                  label: "Height",
                  name: "height",
                  type: "number",
                  value: image.height,
                },
              ]}
              saveCallback={(value) => {
                setImageSize([value.width, value.height]);
              }}
            />
          )}
        </ColoumsContainer>
      </Container>
    );
};
