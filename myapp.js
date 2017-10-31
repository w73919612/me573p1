
var canvas;

var bxScale = 1.0 / 6.0;
var lastX = 0.0;
var lastY = 0.0;
var moveX = 0.0;
var moveY = 0.0;
mousepressed = false;

const SELECT = 0;
const CONNECT = 1;
const ORGATE = 2;
const NOTGATE = 3;

var selectedTool = SELECT;

var inPalette = function (screenX, screenY) {
    var selecting = false;
    var tool = -1;
    console.log("Screen X: " + Number(screenX).toFixed(2)  + 
              ", Screen Y: " + Number(screenY).toFixed(2));
    if (screenX < -0.65 && screenY > -.32) {
        selecting = true;
        if (screenY < 1.0 && screenY > .65) {
            tool = SELECT;
        }
        if (screenY < .65 && screenY > .32) {
            tool = CONNECT;
        }
        if (screenY < .32 && screenY > 0.0) {
            tool = ORGATE;
        }
        if (screenY < 0.0 && screenY > -.32) {
            tool = NOTGATE;
        }
    }
    return tool;
}

var mousedown = function (canvas, evt) {
    var x = evt.clientX;
    var y = evt.clientY;

    selectedTool = inPalette((x - 300) / 300, (300 - y) / 300);
    if (selectedTool != -1) {
        if (selectedTool == SELECT) {
            rgbS[0] = 0.0;
            rgbS[1] = 0.0;
            rgbS[2] = 0.0;
        }
    }
    lastX = x;
    lastY = y;
    console.log("Canvas(x,y): " + lastX + ",   " + lastY);
    // loop()
}

function getMousePos(canvas, evt) {
    lastX = evt.clientX;
    lastY = evt.clientY;
}

var initDemo = function () {

    canvas = document.getElementById("MyCanvas");
    var gl = canvas.getContext("webgl");

    if (!gl) {
        console.log("You can't do it");
    }

    if (!gl) {
        alert("You Can't DO IT!");
    }

    canvas.addEventListener('mousedown', function (evt) {
        mousepressed = !mousepressed;
        console.log("Mouse Down: " + mousepressed);
        mousedown(canvas, evt);
    }, false);

    canvas.addEventListener('mousemove', function (evt) {
        if (mousepressed) {
            getMousePos(canvas, evt);
        }
    });

    canvas.addEventListener('mouseup', function (evt) {
        mousepressed = !mousepressed;
        console.log("Mouse Down: " + mousepressed);
        getMousePos(canvas, evt);
        moveX = (lastX - 300) / 300;
        moveY = (300 - lastY) / 300;
    });

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);


    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderText);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.log("Bad Vertex Shader.");
    }

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderText);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.log("Bad Fragment Shader.");
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log("Bad Linking Program.");
    }
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.log("Bad Validating Program.");
    }

    function getBoxVerts(spx, spy, wid, loop) {
        var set = [];
        if (loop) {
            set.push(spx, spy,
                spx + wid, spy,
                spx + wid, spy - wid,
                spx, spy - wid);
        }
        else {
            set.push(spx, spy,
                spx + wid, spy,
                spx + wid, spy - wid,
                spx, spy - wid);
        }
        return set
    }

    var identityAllMatrices = function () {
        mat4.identity(worldMatrix);
        mat4.identity(scaleMatrix);
        mat4.identity(translateMatrix);
        mat4.identity(rotateMatrix);
    }

    makeBoundingBoxEdge(paletteBoxVertsOn, .95, 1.0);
    makeBoundingBoxEdge(paletteBoxVertsOff, .95, 0.0);


    var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

    gl.useProgram(program);

    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);

    var scaleMatrix = new Float32Array(16);
    var translateMatrix = new Float32Array(16);
    var rotateMatrix = new Float32Array(16);

    identityAllMatrices();

    mat4.lookAt(viewMatrix, [0, 0, 2], [0, 0, 0], [0, 0.01, 0]);
    //mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width/canvas.height, 0.1, 1000.0);
    mat4.ortho(projMatrix, -1.0, 1.0, -1.0, 1.0, -100, 1000);
    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

    var identityMatrix = new Float32Array(16);
    mat4.identity(identityMatrix);
    var angle = 0;


    var drawTransformDrawBoundingBox = function (multiplier) {

        //angle = performance.now() / 1000 / 6 * 2 * Math.PI;
        angle = 0;
        mat4.fromScaling(scaleMatrix, [bxScale, bxScale, bxScale]);
        mat4.fromTranslation(translateMatrix, [-1 * (1.0 - (bxScale)), multiplier - (bxScale), 0]);
        mat4.rotate(rotateMatrix, identityMatrix, angle, [0, 1, 0]);
        mat4.scalar.multiply(worldMatrix, rotateMatrix, scaleMatrix);
        mat4.scalar.multiply(worldMatrix, translateMatrix, worldMatrix);
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
        gl.drawArrays(gl.TRIANGLES, 0, boundingBoxNumVerts);
    }

    var doAttribs = function () {

        positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
        colorAttribLocation = gl.getAttribLocation(program, 'vertColor');

        gl.vertexAttribPointer(
            positionAttribLocation, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0
        );

        gl.vertexAttribPointer(
            colorAttribLocation, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT,
            3 * Float32Array.BYTES_PER_ELEMENT
        );

        gl.enableVertexAttribArray(positionAttribLocation);
        gl.enableVertexAttribArray(colorAttribLocation);

    }


    var loop = function () {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

        //PALETTE : BOUNDING BOX
        var boundingBoxVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, boundingBoxVertexBuffer);
        if (selectedTool == SELECT) {
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(paletteBoxVertsOn), gl.STATIC_DRAW);
        }
        else {
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(paletteBoxVertsOff), gl.STATIC_DRAW);
        }

        doAttribs();
        drawTransformDrawBoundingBox(6.00 / 6.0);

        drawTransformDrawBoundingBox(4.05 / 6.0);
        drawTransformDrawBoundingBox(2.10 / 6.0);
        drawTransformDrawBoundingBox(0.15 / 6.0);

        //PALETTE : SELECTOR TOOL
        var selectorToolVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, selectorToolVertexBuffer);
        if (selectedTool == SELECT) {
            gl.bufferData(gl.ARRAY_BUFFER, selectorToolOnData, gl.STATIC_DRAW);
        }
        else {
            gl.bufferData(gl.ARRAY_BUFFER, selectorToolOffData, gl.STATIC_DRAW);
        }
        doAttribs();
        identityAllMatrices();

        mat4.fromScaling(scaleMatrix, [bxScale, bxScale, bxScale]);
        mat4.fromTranslation(translateMatrix, [-1 * (1.0 - (bxScale)), 1.0 - (bxScale), 0]);
        mat4.scalar.multiply(worldMatrix, rotateMatrix, scaleMatrix);
        mat4.scalar.multiply(worldMatrix, translateMatrix, worldMatrix);
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
        gl.drawArrays(gl.LINE_STRIP, 0, selectorToolNumVerts);

        //PALETTE : CONNECTOR TOOL
        var connectorToolVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, connectorToolVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, connectorToolData, gl.STATIC_DRAW);

        doAttribs();
        identityAllMatrices();

        mat4.fromScaling(scaleMatrix, [.55 * bxScale, .55 * bxScale, bxScale]);
        mat4.fromTranslation(translateMatrix, [-1 * (1.0 - (bxScale)), 4.05 / 6.0 - (bxScale), 0]);
        mat4.scalar.multiply(worldMatrix, rotateMatrix, scaleMatrix);
        mat4.scalar.multiply(worldMatrix, translateMatrix, worldMatrix);
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
        gl.drawArrays(gl.LINE_STRIP, 0, connectorToolNumVerts);

        //PALETTE : OR GATE TOOL
        var orGateVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, orGateVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, orGateData, gl.STATIC_DRAW);


        doAttribs();
        identityAllMatrices();

        mat4.fromScaling(scaleMatrix, [.7 * bxScale, .6 * bxScale, bxScale]);
        mat4.fromTranslation(translateMatrix, [-1 * (1.0 - (bxScale)), 2.10 / 6.0 - (bxScale), 0]);
        mat4.scalar.multiply(worldMatrix, rotateMatrix, scaleMatrix);
        mat4.scalar.multiply(worldMatrix, translateMatrix, worldMatrix);
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
        gl.drawArrays(gl.LINE_STRIP, 0, orGateNumVerts);


        //PALETTE : NOT GATE TOOL
        var notGateVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, notGateVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(notGateVerts), gl.STATIC_DRAW);


        doAttribs();
        identityAllMatrices();

        mat4.fromScaling(scaleMatrix, [.7 * bxScale, .6 * bxScale, bxScale]);
        mat4.fromTranslation(translateMatrix, [-1 * (1.0 - (bxScale)), 0.15 / 6.0 - (bxScale), 0]);
        mat4.scalar.multiply(worldMatrix, rotateMatrix, scaleMatrix);
        mat4.scalar.multiply(worldMatrix, translateMatrix, worldMatrix);
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
        gl.drawArrays(gl.LINE_STRIP, 0, notGateNumVerts);


        //TEST MOVING PIECE
        var notGateVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, notGateVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(notGateVerts), gl.STATIC_DRAW);


        doAttribs();
        identityAllMatrices();

        if (mousepressed) {
            moveX = (lastX - 300) / 300;
            moveY = (300 - lastY) / 300;
        }
        mat4.fromScaling(scaleMatrix, [.7 * bxScale, .6 * bxScale, bxScale]);
        mat4.fromTranslation(translateMatrix, [moveX, moveY, 0]);
        mat4.scalar.multiply(worldMatrix, rotateMatrix, scaleMatrix);
        mat4.scalar.multiply(worldMatrix, translateMatrix, worldMatrix);
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
        gl.drawArrays(gl.LINE_STRIP, 0, notGateNumVerts);
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
};