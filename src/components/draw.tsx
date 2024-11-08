import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ColorInput = styled.div`
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 10px;
  input {
    padding: 0;
    width: 200%;
    height: 200%;
    cursor: pointer;
    transform: translate(-25%, -25%);
  }
`;
const ColorSpan = styled.span`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  background-color: white;
  padding: 10px 10px;
  border-radius: 15px;
  border-top: 1px inset #93a1a1;
  border-left: 1px inset #93a1a1;
  border-bottom: 4px inset #002b36;
  border-right: 4px inset #002b36;
`;

const SmallButton = styled.button`
  padding-left: 19px;
  padding-right: 19px;
`;

export default function Draw(onImageAdd: {
  onImageAdd?: (params: string) => void;
}) {
  const [isPainting, setPainting] = useState(false);
  const [isFilling, setFilling] = useState(false);
  const [isErasing, setErasing] = useState(false);

  const [text, setText] = useState("");
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  function startDraw() {
    if (context == null) return;
    context.lineCap = "round";
    if (isFilling && !isErasing) {
      context?.fillRect(0, 0, 400, 200);
    } else {
      setPainting(true);
    }
  }
  function stopDraw() {
    setPainting(false);
    context?.beginPath();
  }

  function colorChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (context == null) return;
    context.strokeStyle = event.target.value;
    context.fillStyle = event.target.value;
  }

  function changeMode() {
    setFilling(!isFilling);
  }
  function resetCanvas() {
    if (context == null) return;
    context.clearRect(0, 0, 400, 200);
  }
  function eraserMode() {
    setErasing(!isErasing);
  }
  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const eventTarget = event.target.files;
    if (eventTarget == null || eventTarget[0] == null) return;
    const file: File | null = eventTarget[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = () => {
      context?.drawImage(image, 0, 0, 400, 200);
    };
  }
  function saveImage() {
    const url = context?.canvas.toDataURL();
    if (onImageAdd.onImageAdd && url !== undefined) {
      onImageAdd.onImageAdd(url);
    }
  }

  function colorChangeWithOptions(color: string) {
    if (context == null) return;
    context.strokeStyle = color;
    context.fillStyle = color;
  }
  function ColorSelect(color: { color: string }) {
    return (
      <div
        style={{
          backgroundColor: color.color,
          width: 50,
          height: 50,
          borderRadius: 10,
        }}
        onClick={() => {
          colorChangeWithOptions(color.color);
        }}
      ></div>
    );
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) return;
    setContext(canvas.getContext("2d"));
  }, [context]);

  const drawText = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (text === "" || context == null) return;
    context.save();
    context.lineWidth = 1;
    context.font = "48px serif";
    context.strokeStyle = "black";
    context.fillText(text, nativeEvent.offsetX, nativeEvent.offsetY);
    context.strokeText(text, nativeEvent.offsetX, nativeEvent.offsetY);
    context.restore();
  };
  const onMouseMove = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (isErasing && isPainting) {
      context?.clearRect(nativeEvent.offsetX, nativeEvent.offsetY, 20, 20);
    } else if (isPainting) {
      context?.lineTo(nativeEvent.offsetX, nativeEvent.offsetY);
      context?.stroke();
    } else {
      context?.moveTo(nativeEvent.offsetX, nativeEvent.offsetY);
    }
  };
  return (
    <div>
      <canvas
        height={200}
        width={400}
        style={{ border: "2px solid #268bd2", borderRadius: 10 }}
        onDoubleClick={drawText}
        onMouseMove={onMouseMove}
        onMouseLeave={stopDraw}
        onMouseUp={stopDraw}
        onMouseDown={startDraw}
        ref={canvasRef}
      />
      <input
        type="range"
        min="1"
        max="5"
        step="0.5"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (context == null) return;
          context.lineWidth = Number(event.target.value);
        }}
      />
      <ColorSpan>
        <ColorInput>
          <input type="color" onChange={colorChange} />
        </ColorInput>
        <ColorSelect color="black" />
        <ColorSelect color="red" />
        <ColorSelect color="red" />
        <ColorSelect color="red" />
      </ColorSpan>

      <SmallButton onClick={changeMode}>
        {isFilling ? "Draw" : "Fill"}
      </SmallButton>
      <SmallButton onClick={eraserMode}>Erase</SmallButton>
      <SmallButton onClick={resetCanvas}>Reset</SmallButton>
      <SmallButton onClick={saveImage}>Add</SmallButton>
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input
        type="text"
        onChange={(event) => {
          setText(event?.target.value);
        }}
      />
    </div>
  );
}
