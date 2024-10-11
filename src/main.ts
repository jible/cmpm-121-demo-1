import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// Setting up visual assets
const coinImg = document.createElement("img");
coinImg.src = "./visAssets/penny.png"; // Ensure the correct relative path
coinImg.alt = "coinIcon";
coinImg.style.width = "103px"; // Adjust size as needed
coinImg.style.height = "103px";

const logoImg = document.createElement("img");
logoImg.src = "./visAssets/title.png"; // Ensure the correct relative path
logoImg.alt = "titleIcon";
logoImg.style.width = "622px"; // Adjust size as needed
logoImg.style.height = "200px";

//------------------------------------------------------------------------------------------------------------------
// Set up vars/consts for page- like logo and button and money count

const gameName = "Free Money the Game";
document.title = gameName;
let money_count = 0;

const logoHolder = document.createElement("div");
logoHolder.style.display = "flex";
logoHolder.style.flexDirection = "column"; /* Arrange buttons in a column */
logoHolder.style.alignItems =
  "center"; /* Align items to the start of the container */
logoHolder.style.position = "fixed";
logoHolder.style.top = "0";
logoHolder.style.left = "50%";
logoHolder.style.transform = "translateX(-50%)";
logoHolder.style.backgroundColor = "transparent";
logoHolder.appendChild(logoImg);

const countDisplay = document.createElement("countDisplay");
countDisplay.innerHTML = `$${money_count}`;
countDisplay.style.textAlign = "center";
logoHolder.appendChild(countDisplay);

app.append(logoHolder);

const money_button = document.createElement("button");
money_button.style.backgroundColor = "transparent";
money_button.appendChild(coinImg);
app.append(money_button);
money_button.addEventListener("click", () => {
  money_count += 0.01;
});

// const cheatMenu = document.createElement("cheat-menu");
// cheatMenu.
// app.append(cheatMenu);

const buildingButtonContainer = document.createElement("div");
buildingButtonContainer.id = "button-container";
app.append(buildingButtonContainer);

// tooltip for buttons - follows mouse arround and becomes visible over buttons
const tooltip = document.createElement("div");
tooltip.id = "tooltip";
document.body.appendChild(tooltip);
addEventListener("mousemove", (event) => {
  tooltip.style.left = `${event.pageX}px`; // X position
  tooltip.style.top = `${event.pageY + 20}px`; // y position
});

const tooltipTitle = document.createElement("h3");
tooltipTitle.id = "tooltip-title";

const tooltipDescription = document.createElement("p");
tooltipDescription.id = "tooltip-description";

const tooltipProduction = document.createElement("p");
tooltipProduction.id = "tooltip-production";

tooltip.append(tooltipTitle, tooltipDescription, tooltipProduction);
document.body.appendChild(tooltip);

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
      if (this.count == 0) {
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
  moneyPerSecond: number,
): void {
  moneyDiv.innerText = `Money per second: $${moneyPerSecond.toFixed(2)}`;
}
const mpsDisplay: HTMLDivElement = makeUI();

// Make Buildings
const buildingArray: building[] = [];
const lemonadeStand = new building(
  "Lemonade Stand",
  0.1,
  0.5,
  "Sells a 10 cent lemonade every second", // When life gives you lemons, make money!
);
const minimumWageJob = new building(
  "Minimum Wage Job",
  2,
  100,
  `A classic way to make money!`,
);
const moneyTree = new building(
  `Money Tree`,
  50,
  1000,
  `This stuff doesn't grow on... I guess it does!`,
);
const goldenGoose = new building(
  `Golden Goose`,
  120,
  9000,
  `Poops gold! Sounds painful`,
);
const investmentProperty = new building(
  `Investment Property`,
  500,
  80000,
  `Location Location Location!`,
);
const moneyMint = new building(
  `Money Mint`,
  13000,
  600000,
  `Why don't more people just do this?`,
);
const monopoly = new building(
  `Monopoly`,
  50000,
  3000000,
  `This doesn't feel ethical but look at all of this money!`,
);
const infiniteMoneyGlitch = new building(
  `Infinite Money Glitch`,
  999999,
  9999999999,
  `If you clip one dollar bill into another it does this and now you can't stop it.`,
);
// const  = new building("", ,);
// bank
// cookie converter
// money mint
// money solar panel?
// do chores
// money waterfall
// buy a buisness
// infinite money glitch
buildingArray.push(lemonadeStand);
buildingArray.push(minimumWageJob);
buildingArray.push(moneyTree);
buildingArray.push(goldenGoose);
buildingArray.push(investmentProperty);
buildingArray.push(moneyMint);
buildingArray.push(monopoly);
buildingArray.push(infiniteMoneyGlitch);

// Make buttons for buildings

for (
  let buildingIndex = 0;
  buildingIndex < buildingArray.length;
  buildingIndex++
) {
  const currentBuilding = buildingArray[buildingIndex];
  currentBuilding.setupButton();
}

document.addEventListener("keydown", (event) => {
  if (event.key === "c") {
    console.log("cheating");
  }
});

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
  countDisplay.innerHTML = `$${money_count.toFixed(2)}`;
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
