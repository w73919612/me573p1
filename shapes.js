var rgbOn = [0.0, 0.0, 1.0];
var rgbS = [0.0, 0.0, 1.0];
var rgbC = [0.0, 0.0, 1.0];

var boundingBoxNumVerts = 12;
var selectorToolNumVerts = 6;
var orGateNumVerts = 10;
var notGateNumVerts = 9;
var connectorToolNumVerts = 10;

var selectorToolVerticesOn =
    [
        -0.5, 0.5, 0.02, 0, 0, 0,
        -0.5, 0.1, 0.02, 0, 0, 0,
        -0.1, 0.5, 0.02, 0, 0, 0,
        -0.5, 0.5, 0.02, 0, 0, 0,
        -0.5, 0.5, 0.02, 0, 0, 0,
        0.5, -0.5, 0.02, 0, 0, 0
    ];

var selectorToolVerticesOff =
    [
        -0.5, 0.5, 0.02, 0, 0, 1,
        -0.5, 0.1, 0.02, 0, 0, 1,
        -0.1, 0.5, 0.02, 0, 0, 1,
        -0.5, 0.5, 0.02, 0, 0, 1,
        -0.5, 0.5, 0.02, 0, 0, 1,
        0.5, -0.5, 0.02, 0, 0, 1
    ];

var connectorToolVerticesOff =
    [
        -0.75, 0.75, 0.02, 0, 0, 1,
        -0.75, 1.0, 0.02,  0, 0, 1,
        -1.0, 1.0, 0.02,   0, 0, 1,
        -1.0, 0.75, 0.02,  0, 0, 1,
        -0.75, 0.75, 0.02, 0, 0, 1,

        0.75, -0.75, 0.02, 0, 0, 1,
        0.75, -1.0, 0.02,  0, 0, 1,
        1.0, -1.0, 0.02,   0, 0, 1,
        1.0, -0.75, 0.02,  0, 0, 1,
        0.75, -0.75, 0.02, 0, 0, 1
    ];

    var connectorToolVerticesOn =
    [
        -0.75, 0.75, 0.02, 0, 0, 0,
        -0.75, 1.0, 0.02,  0, 0, 0,
        -1.0, 1.0, 0.02,   0, 0, 0,
        -1.0, 0.75, 0.02,  0, 0, 0,
        -0.75, 0.75, 0.02, 0, 0, 0,

        0.75, -0.75, 0.02, 0, 0, 0,
        0.75, -1.0, 0.02,  0, 0, 0,
        1.0, -1.0, 0.02,   0, 0, 0,
        1.0, -0.75, 0.02,  0, 0, 0,
        0.75, -0.75, 0.02, 0, 0, 0
    ];

var paletteBoxVertsOn =
    [
        -1.0, 1.0, 0.0,  0, 0, 1,
        -1.0, -1.0, 0.0, 0, 0, 1,
        1.0, -1.0, 0.0,  0, 0, 1,

        -1.0, 1.0, 0.0,  0, 0, 1,
        1.0, -1.0, 0.0,  0, 0, 1,
        1.0, 1.0, 0.0,   0, 0, 1
    ];

    var paletteBoxVertsOff =
    [
        -1.0, 1.0, 0.0,  0, 0, 1,
        -1.0, -1.0, 0.0, 0, 0, 1,
        1.0, -1.0, 0.0,  0, 0, 1,

        -1.0, 1.0, 0.0,  0, 0, 1,
        1.0, -1.0, 0.0,  0, 0, 1,
        1.0, 1.0, 0.0,   0, 0, 1
    ];



var orGateVerts =
    [
        0.5, 0.0, 0.2, rgbOn[0], rgbOn[1], rgbOn[2],
        -0.5, 1.0, 0.2, rgbOn[0], rgbOn[1], rgbOn[2],
        -0.5, -1.0, 0.2, rgbOn[0], rgbOn[1], rgbOn[2],
        0.5, 0.0, 0.2, rgbOn[0], rgbOn[1], rgbOn[2],
        -0.5, -1.0, 0.2, rgbOn[0], rgbOn[1], rgbOn[2],
        -0.5, -0.5, 0.2, rgbOn[0], rgbOn[1], rgbOn[2],
        -0.75, -0.5, 0.2, rgbOn[0], rgbOn[1], rgbOn[2],
        -0.5, -0.5, 0.2, rgbOn[0], rgbOn[1], rgbOn[2],
        -0.5, 0.5, 0.2, rgbOn[0], rgbOn[1], rgbOn[2],
        -0.75, 0.5, 0.2, rgbOn[0], rgbOn[1], rgbOn[2]
    ];

var notGateVerts =
    [
        0.5, 0.0, 0.2, rgbOn[0], rgbOn[1], rgbOn[2],
        -0.5, 1.0, 0.2, rgbOn[0], rgbOn[1], rgbOn[2],
        -0.5, -1.0, 0.2, rgbOn[0], rgbOn[1], rgbOn[2],
        0.5, 0.0, 0.2, rgbOn[0], rgbOn[1], rgbOn[2],
        0.75, 0.0, 0.2, rgbOn[0], rgbOn[1], rgbOn[2],
        0.5, 0.0, 0.2, rgbOn[0], rgbOn[1], rgbOn[2],
        -0.5, -1.0, 0.2, rgbOn[0], rgbOn[1], rgbOn[2],
        -0.5, 0.0, 0.2, rgbOn[0], rgbOn[1], rgbOn[2],
        -0.75, 0.0, 0.2, rgbOn[0], rgbOn[1], rgbOn[2]
    ];


var selectorToolOnData = Float32Array.from(selectorToolVerticesOn);
var selectorToolOffData = Float32Array.from(selectorToolVerticesOff);
var connectorToolOnData = Float32Array.from(connectorToolVerticesOn);
var connectorToolOffData = Float32Array.from(connectorToolVerticesOff);
var orGateData = Float32Array.from(orGateVerts);
var notGateData = Float32Array.from(notGateVerts);