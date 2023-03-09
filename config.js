config = {
    canvas: {
        width: 200,
        startPosition: 0.9,
    },

    ray: {
        count: 5,
        length: 150,
        spread: Math.PI / 3,
    },

    road: {
        lineCount: 3,
        lineWidth: 4,
        lineColor: 'white',
    },

    car: {
        width: 30,
        height: 50,

        acceleration: 0.2,
        maxSpeed: 3,
        friction: 0.05,
        flipSpeed: 0.03,

        hasSensor: true,

        normalColor: 'blue',
        damagedColor: 'orange',
    }
}