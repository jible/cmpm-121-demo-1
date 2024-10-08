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




class building {
  name: string;
  baseMps: number;
  cost: number;
  costIncreaseRate: number = 1.2;
  buildingCount: number = 0;


  constructor(name: string, baseMPS: number, cost: number, costIncreaseRate?: number){
    this.name = name;
    this.baseMps = baseMPS;
    this.cost = cost;
    this.buildingCount = 0;
    if (costIncreaseRate){
      this.costIncreaseRate = costIncreaseRate;
    }
  }
}

// Make Buildings
const buildingArray: building[] = [];
const lemonadeStand = new building("Lemonade Stand", .1, 10);
const minimumWageJob = new building("Minimum Wage Job", 2, 100);
const goldenGoose = new building("Golden Goose", 50, 1000);




// investment property
// bank
// cookie converter
//money mint
// money solar panel?
// do chores
// money waterfall
// golden goose
// 
// buy a buisness
// infinite money glitch
buildingArray.push(lemonadeStand);
buildingArray.push(minimumWageJob);
buildingArray.push(goldenGoose);

// Make buttons for buildings


const lemonadeStandButton = document.createElement("button");
lemonadeStandButton.innerHTML =
  'Lemonade Stands: 0<br>Cost: 10';
lemonadeStandButton.disabled = true;


const minimumWageJobButton = document.createElement("button");
minimumWageJobButton.innerHTML = 
  'Minimum Wage Jobs: 0<br>Cost: 50';
minimumWageJobButton.disabled = true;

const goldenGooseButton = document.createElement("button");
goldenGooseButton.innerHTML = 
  'Golden Geese: 0<br>Cost: 1000';
goldenGooseButton.disabled = true;



//Setting up purchase button

app.append(lemonadeStandButton);
lemonadeStandButton.addEventListener("click", () => {
  lemonadeStandButton.innerHTML = `Lemonade Stands: ${lemonade_stand_count}\n Lemonade Stand Cost: 10`;
  money_count -= 10;
  lemonade_stand_count += 1;
});

//This stuff occurs every Frame
let lastFrame = 0;
requestAnimationFrame(step);
function step(currentTime: DOMHighResTimeStamp) {
  const elapsed = currentTime - lastFrame;
  lastFrame = currentTime;
  const mps = calcMps()
  

  // Increase count
  money_count += mps * ( elapsed/1000)
  


  // update if things can be purchased
  if (money_count >= 10) {
    lemonadeStandButton.disabled = false;
  } else {
    lemonadeStandButton.disabled = true;
  }



  // update display
  countDisplay.innerHTML = `${Math.round(money_count)}`;

  requestAnimationFrame(step);
}



function calcMps( ){
  let mps: number = 0;
  for (let buildingIndex = 0; buildingIndex < buildingArray.length; buildingIndex++) {
    const currentBuilding = buildingArray[buildingIndex]
    
    mps += currentBuilding.baseMps * 1
  } 
  
  return mps

}