class CarConfig {
    constructor(controlType, maxSpeed = 3, color = 'blue', hasSensor = false) {
        this.width = 30;
        this.height = 50;

        this.acceleration = 0.2;
        this.maxSpeed = maxSpeed;
        this.friction = 0.05;
        this.flipSpeed = 0.03;

        this.controlType = controlType;
        this.hasSensor = hasSensor;
        this.color = color;
    }
}