import styled from "styled-components";

function ColorSelect(color: { color: string }) {
  return (
    <div
      style={{
        backgroundColor: color.color,
        width: 50,
        height: 50,
        borderRadius: 10,
      }}
      data-color={color.color}
    ></div>
  );
}

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

export default function Draw() {
  return (
    <div>
      <canvas
        id="main-canvas"
        height={200}
        width={300}
        style={{ border: "2px solid #268bd2", borderRadius: 10 }}
      />
      <input type="range" min="1" max="5" step="0.5" id="width-input" />
      <ColorSpan>
        <ColorInput>
          <input type="color" min="1" max="5" step="0.5" />
        </ColorInput>
        <ColorSelect color="black" />
        <ColorSelect color="red" />
        <ColorSelect color="red" />
        <ColorSelect color="red" />
      </ColorSpan>

      <SmallButton>Fill</SmallButton>
      <SmallButton>Erase</SmallButton>
      <SmallButton>Reset</SmallButton>
      <SmallButton>Add</SmallButton>
      <input id="file-input" type="file" accept="image/*" />
      <input id="text-input" type="text" />

      <script src="draw.js"></script>
    </div>
  );
}
