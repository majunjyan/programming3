let matrix = []
function matrixGen(matY, matX, grass, grassEat, gishatich, mard) {

    for (let i = 0; i < matY; i++) {
        matrix[i] = [];
        for (let j = 0; j < matX; j++) {
            matrix[i][j] = 0;
        }
    }

    var y = Math.floor(Math.random() * matY)
    var x = Math.floor(Math.random() * matX)
    if (matrix[y][x] == 0) {
        matrix[y][x] = 5;
    }

    for (let i = 0; i < grass; i++) {

        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }

    for (let i = 0; i < mard; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }
    }

    for (let i = 0; i < gishatich; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }
    }

    for (let i = 0; i < grassEat; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        }
    }

}

var grassArr = [];
var grassEaterArr = [];
var GishatichArr = [];
var MardArr = [];
var VirusArr = [];
var side = 20;


matrixGen(side * 2, side * 2, 2 * side * side, side * side, (side * side) / 8, (side * side) / 40);

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background("white");
    frameRate(4)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            } else if (matrix[y][x] == 2) {
                var grEater = new GrassEater(x, y);
                grassEaterArr.push(grEater);
            } else if (matrix[y][x] == 3) {
                var gishatich = new Gishatich(x, y);
                GishatichArr.push(gishatich);
            } else if (matrix[y][x] == 4) {
                var mard = new Mard(x, y);
                MardArr.push(mard);
            } else if (matrix[y][x] == 5) {
                var vr = new Virus(x, y);
                VirusArr.push(vr);
            }
        }
    }
}

function draw() {


    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            if (matrix[y][x] == 1) {
                fill("#118039");
            }
            else if (matrix[y][x] == 2) {
                fill("#e6bf22");
            }
            else if (matrix[y][x] == 3) {
                fill("#C20808");
            }
            else if (matrix[y][x] == 4) {
                for (let i = 0; i < MardArr.length; i++) {
                    if (MardArr[i].hivand >= 1) {
                        fill("#821045");
                        MardArr[i].hivand--
                        break;
                    } else {
                        fill("black");
                        break;
                    }
                }
            }
            else if (matrix[y][x] == 5) {
                fill("#34eb55");
            }
            else if (matrix[y][x] == 0) {
                fill("#878787");
            }
            rect(x * side, y * side, side, side);
        }
    }

    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat();
    }
    for (let i = 0; i < GishatichArr.length; i++) {
        GishatichArr[i].eat();
    }
    for (let i = 0; i < MardArr.length; i++) {
        MardArr[i].eat();
    }
    for (let i = 0; i < VirusArr.length; i++) {
        VirusArr[i].varakel()
    }

}


