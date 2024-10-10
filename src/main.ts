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

const money_button = document.createElement("button");
money_button.innerHTML = "💸";

app.append(money_button);
money_button.addEventListener("click", () => {
  money_count++;
});

class building {
  name: string;
  baseMps: number;
  cost: number;
  costIncreaseRate: number = 1.15;
  buildingCount: number = 0;
  count: number = 0;
  button: HTMLButtonElement | null = null;

  constructor(
    name: string,
    baseMPS: number,
    cost: number,
    costIncreaseRate?: number
  ) {
    this.name = name;
    this.baseMps = baseMPS;
    this.cost = cost;
    this.buildingCount = 0;
    if (costIncreaseRate) {
      this.costIncreaseRate = costIncreaseRate;
    }
  }

  setupButton(): void {
    this.button = document.createElement("button");
    this.button.innerHTML = `${this.name}s: ${this.count}<br>Cost: ${Math.round(this.cost)}`;
    this.button.disabled = true;
    app.append(this.button);
    this.button.addEventListener("click", () => {
      money_count -= this.cost;
      this.count += 1;
      this.cost *= this.costIncreaseRate;
      if (this.button) {
        this.button.innerHTML = `${this.name}s: ${this.count}<br>Cost: ${Math.round(this.cost)}`;
      }
    });
  }

  updateButton() {
    if (this.button) {
      this.button.innerHTML = `${this.name}s: ${this.count}<br>Cost: ${Math.round(this.cost)}`;

      if (money_count >= this.cost) {
        this.button.disabled = false;
      } else {
        this.button.disabled = true;
      }
    }
  }
}

// Make Money per second Display
function makeUI(): HTMLDivElement {
  const newUI = document.createElement("div");

  // Set the text content
  newUI.innerText = "Money per second: 0";

  // Style the element
  Object.assign(newUI.style, {
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "white",
    fontFamily: "'Press Start 2P', cursive",
    fontSize: "14px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "5px",
    borderRadius: "5px",
    zIndex: "1",
  });

  // Append to the document
  document.body.appendChild(newUI);

  return newUI;
}
function updateMoneyPerSecond(
  moneyDiv: HTMLDivElement,
  moneyPerSecond: number
): void {
  moneyDiv.innerText = `Money per second: ${moneyPerSecond}`;
}
const mpsDisplay: HTMLDivElement = makeUI();

// Make Buildings
const buildingArray: building[] = [];
const lemonadeStand = new building("Lemonade Stand", 0.1, 10);
const minimumWageJob = new building("Minimum Wage Job", 2, 100);
const goldenGoose = new building("Golden Goose", 50, 1000);

// investment property
// bank
// cookie converter
//money mint
// money solar panel?
// do chores
// money waterfall
// buy a buisness
// infinite money glitch
buildingArray.push(lemonadeStand);
buildingArray.push(minimumWageJob);
buildingArray.push(goldenGoose);

// Make buttons for buildings

for (
  let buildingIndex = 0;
  buildingIndex < buildingArray.length;
  buildingIndex++
) {
  const currentBuilding = buildingArray[buildingIndex];
  currentBuilding.setupButton();
}

//This stuff occurs every Frame
//------------------------------------------------------------------------------------------------------------------
let lastFrame = 0;
requestAnimationFrame(step);
function step(currentTime: DOMHighResTimeStamp) {
  const elapsed = currentTime - lastFrame;
  lastFrame = currentTime;
  const mps = calcMps();

  // Increase count
  money_count += mps * (elapsed / 1000);

  // update display
  for (
    let buildingIndex = 0;
    buildingIndex < buildingArray.length;
    buildingIndex++
  ) {
    const currentBuilding = buildingArray[buildingIndex];
    currentBuilding.updateButton();
  }
  countDisplay.innerHTML = `${Math.round(money_count)}`;
  updateMoneyPerSecond(mpsDisplay, mps);

  requestAnimationFrame(step);
}

function calcMps() {
  let mps: number = 0;
  for (
    let buildingIndex = 0;
    buildingIndex < buildingArray.length;
    buildingIndex++
  ) {
    const currentBuilding = buildingArray[buildingIndex];
    mps += currentBuilding.baseMps * currentBuilding.count;
  }
  return mps;
}
