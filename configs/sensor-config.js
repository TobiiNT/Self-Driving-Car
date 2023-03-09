class SensorConfig {
    constructor(count = 5, length = 150, speadRatio = 3) {
        this.rayCount = count;
        this.rayLength = length;
        this.raySpread = Math.PI / speadRatio;
    }
}