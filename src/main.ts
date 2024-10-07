import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Free Money the Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let money_count = 0;
//let all_time_money = 0;

const countDisplay = document.createElement("countDisplay");
countDisplay.innerHTML = `${money_count}`;
app.append(countDisplay);

const button = document.createElement("button");
button.innerHTML = "💸";

app.append(button);
button.addEventListener("click", () => {
  money_count++;
  countDisplay.innerHTML = `${money_count}`;
});

setInterval(() => {
  money_count++;
  countDisplay.innerHTML = `${money_count}`;
}, 1000);
