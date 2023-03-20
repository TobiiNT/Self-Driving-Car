class SensorConfig {
    constructor(count = 5, length = 150, speadRatio = 2) {
        this.rayCount = count;
        this.rayLength = length;
        this.raySpread = Math.PI / speadRatio;
    }
}