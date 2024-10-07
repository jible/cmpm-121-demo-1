import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Free Money the Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let money_count = 0;
let lemonade_stand_count = 0;
//let all_time_money = 0;

const countDisplay = document.createElement("countDisplay");
countDisplay.innerHTML = `${money_count}`;
app.append(countDisplay);

const money_button = document.createElement("button");
money_button.innerHTML = "💸";

app.append(money_button);
money_button.addEventListener("click", () => {
  money_count++;
});

//Setting up purchase button
const lemonade_stand_button = document.createElement("button");
lemonade_stand_button.innerHTML =
  "Lemonade Stands: 0\n Lemonade Stand Cost: 10";
lemonade_stand_button.disabled = true;
app.append(lemonade_stand_button);
lemonade_stand_button.addEventListener("click", () => {
  lemonade_stand_button.innerHTML = `Lemonade Stands: ${lemonade_stand_count}\n Lemonade Stand Cost: 10`;
  money_count -= 10;
  lemonade_stand_count += 1;
});

//This stuff occurs every Frame
let lastFrame = 0;
requestAnimationFrame(step);
function step(currentTime: DOMHighResTimeStamp) {
  const elapsed = currentTime - lastFrame;
  lastFrame = currentTime;
  money_count += (lemonade_stand_count * elapsed) / 1000;
  countDisplay.innerHTML = `${Math.round(money_count)}`;

  // update if things can be purchased
  if (money_count >= 10) {
    lemonade_stand_button.disabled = false;
  } else {
    lemonade_stand_button.disabled = true;
  }

  requestAnimationFrame(step);
}
