const clock = document.getElementById("clock");

setInterval(() => {
  let hour = String(new Date().getHours()).padStart(2, "0");
  let minute = String(new Date().getMinutes()).padStart(2, "0");
  let second = String(new Date().getSeconds()).padStart(2, "0");
  clock.innerText = `${hour}:${minute}:${second}`;
}, 100);
