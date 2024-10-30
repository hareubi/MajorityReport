const loginForm = document.getElementById("login-form");
const loginInput = loginForm.getElementsByTagName("input");
const welcome = document.getElementById("welcome");
const usernameKey = "usernameKey";
const savedUsername = localStorage.getItem(usernameKey);
if (savedUsername === null) {
  welcome.classList.add("hidden");
  loginInput[0].addEventListener("submit", onLogin);
  loginInput[1].addEventListener("click", onLogin);
} else {
  loginForm.classList.add("hidden");
  updateWelcome(savedUsername);
}

function onLogin(e) {
  e.preventDefault();
  username = loginInput[0].value.trim();
  loginForm.classList.add("hidden");
  updateWelcome(username);
  localStorage.setItem(usernameKey, username);
}

function updateWelcome(username) {
  welcome.classList.remove("hidden");
  welcome.innerText = `Welcome, ${username}`;
}
