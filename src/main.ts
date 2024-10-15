import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// -------------------------------------------------------------------------
// Setting up visual assets
// -------------------------------------------------------------------------
const coinImg = document.createElement("img");
coinImg.src = "Image/penny.png";
coinImg.style.width = "103px";
coinImg.style.height = "103px";

const logoImg = document.createElement("img");
logoImg.src = "Image/title.png";
logoImg.style.width = "622px";
logoImg.style.height = "200px";

// -------------------------------------------------------------------------
// Set up variables for page - logo, buttons, and money count
// -------------------------------------------------------------------------
const gameName = "Free Money the Game";
document.title = gameName;
let money_count = 0;

const logoHolder = document.createElement("div");
logoHolder.className = "logo-holder"; // Applying CSS class
logoHolder.appendChild(logoImg);

const countDisplay = document.createElement("countDisplay");
countDisplay.innerHTML = `$${money_count}`;
countDisplay.style.textAlign = "center";
logoHolder.appendChild(countDisplay);

app.append(logoHolder);

const money_button = document.createElement("button");
money_button.className = "money-button"; // Applying CSS class
money_button.appendChild(coinImg);
app.append(money_button);
money_button.addEventListener("click", () => {
  money_count += 0.01;
});

const buildingButtonContainer = document.createElement("div");
buildingButtonContainer.id = "button-container";
app.append(buildingButtonContainer);

// -------------------------------------------------------------------------
// Tooltip setup: follows mouse around and becomes visible over buttons
// -------------------------------------------------------------------------

const tooltip = document.createElement("div");
tooltip.id = "tooltip";
document.body.appendChild(tooltip);
addEventListener("mousemove", (event) => {
  tooltip.style.left = `${event.pageX}px`;
  tooltip.style.top = `${event.pageY + 20}px`;
});

const tooltipTitle = document.createElement("h3");
tooltipTitle.id = "tooltip-title";

const tooltipDescription = document.createElement("p");
tooltipDescription.id = "tooltip-description";

const tooltipProduction = document.createElement("p");
tooltipProduction.id = "tooltip-production";

tooltip.append(tooltipTitle, tooltipDescription, tooltipProduction);

class building {
  name: string;
  baseMps: number;
  cost: number;
  description: string;
  costIncreaseRate: number = 1.15;
  buildingCount: number = 0;
  count: number = 0;
  button: HTMLButtonElement | null = null;

  constructor(
    name: string,
    baseMPS: number,
    cost: number,
    description: string,
    costIncreaseRate?: number,
  ) {
    this.name = name;
    this.baseMps = baseMPS;
    this.cost = cost;
    this.buildingCount = 0;
    this.description = description;
    if (costIncreaseRate) {
      this.costIncreaseRate = costIncreaseRate;
    }
  }

  setupButton(): void {
    this.button = document.createElement("button");
    this.button.style.textAlign = `left`;
    this.button.innerHTML = `${this.name}s: ${this.count}<br>Cost: ${Math.round(this.cost)}`;
    this.button.disabled = true;
    buildingButtonContainer.append(this.button);
    this.button.addEventListener("mouseenter", () => {
      tooltipTitle.textContent = this.name;
      tooltipDescription.textContent = this.description;
      if (this.count > 0) {
        tooltipProduction.textContent = `Produces $${this.baseMps.toFixed(2)} money per second`;
      }
      tooltip.style.visibility = "visible";
    });
    this.button.addEventListener("mouseleave", () => {
      tooltipTitle.textContent = ``;
      tooltipDescription.textContent = ``;
      tooltipProduction.textContent = ``;
      tooltip.style.visibility = "hidden";
    });
    this.button.addEventListener("click", () => {
      if (this.count === 0) {
        tooltipProduction.textContent = `Produces $${this.baseMps.toFixed(2)} money per second`;
      }
      money_count -= this.cost;
      this.count += 1;
      this.cost *= this.costIncreaseRate;
      if (this.button) {
        this.button.innerHTML = `${this.name}s: $${this.count}<br>Cost: $${this.cost.toFixed(2)}`;
      }
    });
  }
  updateButton() {
    if (this.button) {
      this.button.innerHTML = `${this.name}s: ${this.count}<br>Cost: $${this.cost.toFixed(2)}`;
      if (money_count >= this.cost) {
        this.button.disabled = false;
      } else {
        this.button.disabled = true;
      }
    }
  }
}
// -------------------------------------------------------------------------
// Make Money per second Display and UI functions
// -------------------------------------------------------------------------
function makeUI(): HTMLDivElement {
  const newUI = document.createElement("div");
  newUI.innerText = "Money per second: 0";

  Object.assign(newUI.style, {
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "white",
    fontSize: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "5px",
    borderRadius: "5px",
    zIndex: "1",
  });

  document.body.appendChild(newUI);
  return newUI;
}

function updateMoneyPerSecond(
  moneyDiv: HTMLDivElement,
  moneyPerSecond: number,
): void {
  moneyDiv.innerText = `Money per second: $${moneyPerSecond.toFixed(3)}`;
}

const mpsDisplay: HTMLDivElement = makeUI();

// -------------------------------------------------------------------------
// Make Buildings
// -------------------------------------------------------------------------
const buildingArray: building[] = [
  new building(
    "Lemonade Stand",
    0.001,
    0.01,
    "Sells a 1 cent lemonade every 10 seconds",
  ),
  new building("Minimum Wage Job", 2, 100, `A classic way to make money!`),
  new building(
    "Money Tree",
    50,
    1000,
    `This stuff doesn't grow on... I guess it does!`,
  ),
  new building("Golden Goose", 120, 9000, `Poops gold! Sounds painful`),
  new building(
    "Investment Property",
    500,
    80000,
    `Location Location Location!`,
  ),
  new building("Money Mint", 13000, 600000, `Don't tell the IRS?`),
  new building(
    "Monopoly",
    50000,
    3000000,
    `I know this board game is good, but I didn't know it was that good.`,
  ),
  new building(
    "Infinite Money Glitch",
    999999,
    9999999999,
    `If you clip one dollar bill into another it does this and now you can't stop it.`,
  ),
];
// -------------------------------------------------------------------------
// Initialize building buttons
// -------------------------------------------------------------------------
for (const currentBuilding of buildingArray) {
  currentBuilding.setupButton();
}

// -------------------------------------------------------------------------
// cheat menu
// -------------------------------------------------------------------------

const cheatMenu = document.createElement("div");
cheatMenu.id = "cheat-menu"; // Applies the CSS styling
cheatMenu.innerText = "Cheat Menu";
document.body.appendChild(cheatMenu);
let cheating = false;
document.addEventListener("keydown", (event) => {
  if (event.key === "c") {
    cheating = !cheating;
    if (cheating) {
      cheatMenu.style.visibility = "visible";
    } else {
      cheatMenu.style.visibility = "hidden";
    }
  }
});

// cheat buttons
const addHunderedButton = document.createElement("button");
addHunderedButton.innerHTML = "Add $100";
cheatMenu.appendChild(addHunderedButton);
addHunderedButton.addEventListener("click", () => {
  money_count += 100;
});

const addThousandButton = document.createElement("button");
addThousandButton.innerHTML = "Add $1 Thousand";
cheatMenu.appendChild(addThousandButton);
addThousandButton.addEventListener("click", () => {
  money_count += 1000;
});

const addMillionButton = document.createElement("button");
addMillionButton.innerHTML = "Add $1 Million";
cheatMenu.appendChild(addMillionButton);
addMillionButton.addEventListener("click", () => {
  money_count += 1000000;
});

const squareMoneyButton = document.createElement("button");
squareMoneyButton.innerHTML = "Square your money";
cheatMenu.appendChild(squareMoneyButton);
squareMoneyButton.addEventListener("click", () => {
  money_count = money_count * money_count;
});

// -------------------------------------------------------------------------
// Frame update
// -------------------------------------------------------------------------
let lastFrame = 0;
requestAnimationFrame(step);
function step(currentTime: DOMHighResTimeStamp) {
  const elapsed = currentTime - lastFrame;
  lastFrame = currentTime;
  const mps = calcMps();

  money_count += mps * (elapsed / 1000);

  for (const currentBuilding of buildingArray) {
    currentBuilding.updateButton();
  }
  countDisplay.innerHTML = `$${money_count.toFixed(2)}`;
  updateMoneyPerSecond(mpsDisplay, mps);

  requestAnimationFrame(step);
}

// -------------------------------------------------------------------------
// calculation logic
// -------------------------------------------------------------------------
function calcMps() {
  return buildingArray.reduce((mps, currentBuilding) => {
    return mps + currentBuilding.baseMps * currentBuilding.count;
  }, 0);
}
