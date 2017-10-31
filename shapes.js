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

var connectorToolVertices =
    [
        -0.75, 0.75, 0.02, rgbC[0], rgbC[1], rgbC[2],
        -0.75, 1.0, 0.02, rgbC[0], rgbC[1], rgbC[2],
        -1.0, 1.0, 0.02, rgbC[0], rgbC[1], rgbC[2],
        -1.0, 0.75, 0.02, rgbC[0], rgbC[1], rgbC[2],
        -0.75, 0.75, 0.02, rgbC[0], rgbC[1], rgbC[2],

        0.75, -0.75, 0.02, rgbC[0], rgbC[1], rgbC[2],
        0.75, -1.0, 0.02, rgbC[0], rgbC[1], rgbC[2],
        1.0, -1.0, 0.02, rgbC[0], rgbC[1], rgbC[2],
        1.0, -0.75, 0.02, rgbC[0], rgbC[1], rgbC[2],
        0.75, -0.75, 0.02, rgbC[0], rgbC[1], rgbC[2],
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

var makeBoundingBoxEdge = function (inSet, factor, color) {
    var f = factor;
    var ln = inSet.length;

    for (var i = 0; i < ln; i++) {

        inSet.push(inSet[i] * f);
        inSet.push(inSet[i + 1] * f);
        inSet.push(0.01);
        inSet.push(inSet[i + 3]);
        inSet.push(inSet[i + 4]);
        inSet.push(color);
        i = i + 5;
        console.log(i);
    }
};


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
var connectorToolData = Float32Array.from(connectorToolVertices);
var orGateData = Float32Array.from(orGateVerts);
var notGateData = Float32Array.from(notGateVerts);