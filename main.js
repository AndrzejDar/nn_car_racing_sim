const genSize = 1000;
const reproductionRate = 0.01;

let canvas = "";
let ctx = "";
let graphCtx = "";
let graphContainer = "";
let road = "";
let cars = [];
let traffic = [];
let isSimulating = false;
let isBrainsSaved = false;
let reproductorsBrains = [];
let generation = 0;
let globalBiasAmount = 1;
let globalWeightAmount = 1;
let prevResults = [];
let simSpeed = 2; //draw evry nth frame
let frame = 1;
let lanes = 5;
let drawNth = 1;

initialize();

function initialize() {
  canvas = document.getElementById("myCanvas");
  canvas.width = 270;
  ctx = canvas.getContext("2d");
  road = new Road(canvas.width / 2, canvas.width * 0.9, lanes);
  deathLine = new DeathLine(canvas.width, 3.8);
  traffic = generateTraffic(lanes);
  isBrainsSaved = false;

  //generates initial random cars
  cars = generateCars(genSize);
  // reproductors = [];

  let bestCar = cars[0];

  if (reproductorsBrains.length > 0) {
    console.log(reproductorsBrains[0]);
    // console.log(reproductorsBrains[0].levels[0].biases[0].stringify());
    mutateCars(reproductorsBrains);
  }

  animate();
  // printPrevResuts();

  graphContainer = document.getElementById("visuals");
  graphCanvas = document.getElementById("graph");
  graphCanvas.width = graphContainer.clientWidth;

  graphCanvas.height = (graphContainer.clientHeight - 30) / 2;

  graphCtx = graphCanvas.getContext("2d");

  // drawVisuals(graphCtx, bestCar.brain);
  drawResultsChart(prevResults, graphContainer);
}

function save() {
  console.log("saving");
  console.log(bestCar.brain);
  console.log(bestCar);
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}
function remove() {
  localStorage.removeItem("bestBrain");
  localStorage.removeItem("bestBrains");
}

function start() {
  isSimulating = true;
  animate();
}
function stop() {
  isSimulating = false;
}
function kill() {
  let sortedCars = cars.sort((a, b) => {
    return a.y - b.y;
  });
  console.log(sortedCars);
  reproductorsBrains = [];
  for (let i = 0; i < genSize * reproductionRate; i++)
    reproductorsBrains.push(sortedCars[i].brain);

  console.log(reproductorsBrains);

  for (let i = 0; i < cars.length; i++) {
    cars[i].damaged = true;
  }
}
function reset() {
  console.log(bestCar);
  prevResults.push(bestCar.y);
  stop();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  initialize();
  setTimeout(() => start(), 100);
}

function generateCars(i) {
  const cars = new Array(i);
  for (let i = 0; i < genSize; i++) {
    cars[i] = new Car(road.getLaneCenter(2), 0, 30, 50, "AI");
  }
  return cars;
}

function mutateCars(reproductorsBrains) {
  for (let i = 0; i < cars.length; i++) {
    // console.log(i % reproductors.length);
    cars[i].brain = deepCopy(reproductorsBrains[i % reproductorsBrains.length]);
    if (i >= reproductorsBrains.length)
      NerualNetwork.geneticAlgo(
        cars[i].brain,
        cars[randWholeNumInRange(0, reproductorsBrains.length)].brain
      );
    //first iteration of mutation
    // NerualNetwork.mutate(cars[i].brain, globalBiasAmount, globalWeightAmount);
    //log brain of first reproductor
    // if (i == 0) console.log(cars[i].brain.levels[0].weights[0]);
    //log briani of last reproductor
    // if (i == reproductorsBrains.length - 1)
    // console.log(cars[i].brain.levels[0].weights[0]);
  }
}

function animate() {
  //animate deathLine
  deathLine.update();
  // animiate cars in traffic
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  // fitnes func
  bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y)));

  alive = [];
  for (let i = 0; i < genSize; i++) {
    //kill struglers
    if (cars[i].y > deathLine.y && !cars[i].damaged) {
      cars[i].damaged = true;
    }
    // save as alive
    if (!cars[i].damaged) alive.push(i);

    // animtae ai cars
    if (cars[i].damaged == false) cars[i].update(road.borders, traffic);
  }

  // count driving

  const counter = document.getElementById("counter");
  counter.innerText = alive.length;

  const genCounter = document.getElementById("genCounter");
  genCounter.innerText = `Gen: ${generation}`;

  //save brains if reproductionRate is reached
  if (alive.length < genSize * reproductionRate && isBrainsSaved == false) {
    console.log(alive);
    if (alive.length != 0) reproductorsBrains = [];
    for (let i = 0; i < alive.length; i++) {
      reproductorsBrains.push(cars[alive[i]].brain);
    }

    console.log("saved reproductors to variable", reproductorsBrains);
    isBrainsSaved = true;
  }

  if (alive.length < (genSize * reproductionRate) / 2 && generation < 3) {
    console.log("reseting");

    //adjust globals
    generation++;
    reset();
  }
  if (alive.length < 1 && generation >= 3) {
    console.log("reseting");

    //adjust globals
    generation++;
    globalBiasAmount = globalBiasAmount * 0.9;
    globalWeightAmount = globalWeightAmount * 0.9;
    reset();
  }
  if (generation % drawNth == 0) drawSim();
  // drawVisuals(bestCar.brain);

  if (isSimulating) requestAnimationFrame(animate);
  // drawGraph(bestCar.brain);
}

function drawSim() {
  canvas.height = window.innerHeight;
  ctx.save();
  ctx.translate(0, -bestCar.y + canvas.height * 0.7);
  road.draw(ctx);
  deathLine.draw(ctx, "red");
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx, "red");
  }
  ctx.globalAlpha = 0.05;
  for (let i = 0; i < genSize; i++) {
    if (i < reproductorsBrains.length) {
      ctx.globalAlpha = 0.8;
      cars[i].draw(ctx, "green");
      ctx.globalAlpha = 0.05;
    }
    //draw only cars in view
    if (bestCar.y - cars[i].y > -400) cars[i].draw(ctx, "blue");
  }
  ctx.globalAlpha = 1;
  bestCar.draw(ctx, "blue", true);

  // cars[0].draw(ctx, "purple", false);

  ctx.restore();
  drawVisuals(graphCtx, graphContainer, bestCar.brain);
}

function printPrevResuts() {
  let container = document.getElementById("results");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  for (let i = 0; i < prevResults.length; i++) {
    let result = document.createElement("span");
    result.innerText = `gen: ${i + 1}, result: ${
      -1 * prevResults[i].toFixed(2)
    }`;
    container.appendChild(result);
  }
}
