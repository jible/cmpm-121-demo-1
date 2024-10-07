import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My stupendous game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
let count = 0;

const countDisplay = document.createElement("countDisplay");
countDisplay.innerHTML = `${count}`;
document.body.appendChild(countDisplay);

const button = document.createElement("button");
button.innerHTML = "Click Me";

document.body.appendChild(button);
button.addEventListener("click", () => {
  count++;
  countDisplay.innerHTML = `${count}`;
});
