const canvas = document.getElementById("main-canvas");
const widthInput = document.getElementById("width-input");
const colorInput = document.getElementById("color-input");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const modeButton = document.getElementById("mode-button");
const resetButton = document.getElementById("reset-button");
const eraserButton = document.getElementById("eraser-button");
const saveButton = document.getElementById("save-button");
const fileInput = document.getElementById("file-input");
const textInput = document.getElementById("text-input");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 300;
ctx.lineWidth = widthInput.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

canvas.addEventListener("mousemove", move);
function move(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  } else {
    ctx.moveTo(event.offsetX, event.offsetY);
  }
}
canvas.addEventListener("mousedown", onMouseDown);
function onMouseDown() {
  if (isFilling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    isPainting = true;
  }
}
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseleave", stopDraw);
function stopDraw() {
  isPainting = false;
  ctx.beginPath();
}
canvas.addEventListener("dblclick", onDoubleClick);
function onDoubleClick(event) {
  if (textInput.value === "") return;
  ctx.save();
  ctx.lineWidth = 1;
  ctx.font = "48px serif";
  ctx.strokeStyle = "black";
  ctx.fillText(textInput.value, event.offsetX, event.offsetY);
  ctx.strokeText(textInput.value, event.offsetX, event.offsetY);
  ctx.restore();
}

widthInput.addEventListener("change", widthChange);
function widthChange(event) {
  ctx.lineWidth = event.target.value;
}
colorInput.addEventListener("change", colorChange);
function colorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}
colorOptions.forEach((color) =>
  color.addEventListener("click", colorChangeWithOptions)
);
function colorChangeWithOptions(event) {
  ctx.strokeStyle = event.target.dataset.color;
  ctx.fillStyle = event.target.dataset.color;
  colorInput.value = event.target.dataset.color;
}

modeButton.addEventListener("click", changeMode);
function changeMode() {
  isFilling = !isFilling;
  if (isFilling) {
    modeButton.innerText = "Draw";
  } else {
    modeButton.innerText = "Fill";
  }
}
resetButton.addEventListener("click", resetCanvas);
function resetCanvas() {
  const temp = ctx.fillStyle;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = temp;
}

eraserButton.addEventListener("click", eraserMode);
function eraserMode() {
  ctx.strokeStyle = "white";
}
fileInput.addEventListener("change", onFileChange);
function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = () => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    console.log(url);
  };
}
saveButton.addEventListener("click", saveImage);
function saveImage() {
  const url = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = url;
  link.download = "Drawing.png";
  link.click();
}
