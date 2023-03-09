const roadCanvas = document.getElementById("roadCanvas");
const networkCanvas = document.getElementById("networkCanvas");

const roadCtx = roadCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

roadCanvas.width = 300;
networkCanvas.width = 300;

const totalLane = 5;
const totalCar = 100;
const totalTraffic = 100;
const leastDistanceBetweenCars = 200;

let middleLane = Math.floor(totalLane / 2);
let rightRoad = null;
let cars = [];
let traffic = [];
let bestCar = null;
let myCar = null;

reset();


function reset() {
    rightRoad = new Road(roadCanvas.width / 2, roadCanvas.width * 0.9, totalLane);
    cars = generateAICars(totalCar);

    myCar = generateMyCar();
    cars.push(myCar);
    bestCar = cars[0];
    if (localStorage.getItem("bestBrain")) {
        for (let i = 0; i < cars.length; i++) {
            cars[i].brain = JSON.parse(
                localStorage.getItem("bestBrain"));
            if (i != 0) {
                NeuralNetwork.mutate(cars[i].brain, 0.1);
            }
        }
    }

    traffic = [];
    for (let i = 0; i < totalTraffic; i++) {
        let laneRemains = Array.from(Array(totalLane).keys());
        for (let j = 0; j < totalLane / 2; j++) {
            const randomIndex = Math.floor(Math.random() * laneRemains.length);
            const randomLane = laneRemains[randomIndex];
            laneRemains.splice(randomIndex, 1);

            let config = new CarConfig("DUMMY", 1, getRandomColor());
            let car = new Car(rightRoad.getLaneCenter(randomLane), -(totalTraffic * leastDistanceBetweenCars) + i * leastDistanceBetweenCars, config);
            traffic.push(car);
        }
    }
}

function saveBrain() {
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discardBrain() {
    localStorage.removeItem("bestBrain");
}

function generateMyCar() {
    let config = new CarConfig("KEYS", 3, 'red');
    let car = new Car(rightRoad.getLaneCenter(middleLane), 0, config);
    car.addSensor(new SensorConfig(6));

    return car;
}

function generateAICars(N) {
    const cars = [];
    for (let i = 1; i <= N; i++) {
        let config = new CarConfig("AI", 3, 'blue');
        let car = new Car(rightRoad.getLaneCenter(middleLane), 0, config);
        car.addSensor(new SensorConfig(6));
        car.addBrain(5);

        cars.push(car);
    }
    return cars;
}

validate();



function validate(time) {
    roadCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    let allTraffic = cars.concat(traffic);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(rightRoad.borders, allTraffic);
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(rightRoad.borders, traffic);
    }
    bestCar = cars.find(
        c => c.y == Math.min(
            ...cars.map(c => c.y)
        ));

    roadCtx.translate(0, -bestCar.y + roadCanvas.height * 0.8);
    rightRoad.draw(roadCtx);

    drawCars(roadCtx);

    if (bestCar.brain) {
        networkCtx.lineDashOffset = -time / 50;
        Visualizer.drawNetwork(networkCtx, bestCar.brain);
    }
    requestAnimationFrame(validate);
}

function drawCars(roadCtx) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(roadCtx);
    }
    roadCtx.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(roadCtx);
    }
    roadCtx.globalAlpha = 1;
    bestCar.draw(roadCtx, true);
    myCar.draw(roadCtx, true);
}