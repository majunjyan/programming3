

class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseCell(ch) {
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }


    mul() {

        this.multiply++
        let emptyCell = this.chooseCell(0)
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.multiply >= 4) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 1;
            let newGrass = new Grass(newX, newY)
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
}
class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
        this.energy = 8;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(ch) {
        this.getNewCoordinates()
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        this.energy--;
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
        }

    }
    mul() {
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy >= 12) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;
            let newGrassEater = new GrassEater(newX, newY)
            grassEaterArr.push(newGrassEater);
            this.energy -= 4;
        } else if (this.energy < 0) {
            this.die();
        }
    }
    eat() {
        let emptyCell = this.chooseCell(1)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell) {
            this.energy++
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0;


            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;
        }
        else {
            this.move();
        }

        this.mul();
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}

class Gishatich {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
        this.energy = 14;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(ch) {
        this.getNewCoordinates()
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        this.energy--;
        let emptyCell1 = this.chooseCell(1)
        let emptyCell0 = this.chooseCell(0)

        let arr = emptyCell0.concat(emptyCell1)

        let newCell = arr[Math.floor(Math.random() * arr.length)];


        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            if (matrix[newY][newX] == 0) {
                matrix[newY][newX] = 3
                matrix[this.y][this.x] = 0;
                this.x = newX
                this.y = newY
            } else if (matrix[newY][newX] == 1) {
                matrix[newY][newX] = 3
                matrix[this.y][this.x] = 1;
                this.x = newX
                this.y = newY
            }
        }
    }
    mul() {
        let emptyCell0 = this.chooseCell(0)
        let emptyCell1 = this.chooseCell(1)
        let emptyCell = emptyCell0.concat(emptyCell1)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy >= 17) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 3;
            let newGishatich = new Gishatich(newX, newY)
            GishatichArr.push(newGishatich);
            this.energy -= 4;
        }
        else if (this.energy < 0) {
            this.die();
        }
    }
    eat() {
        let emptyCell = this.chooseCell(2)

        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell) {
            this.energy++
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;

            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX
            this.y = newY
        } else {
            this.hungry++
            this.move();
        }
        this.mul();
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < GishatichArr.length; i++) {
            if (GishatichArr[i].x == this.x && GishatichArr[i].y == this.y) {
                GishatichArr.splice(i, 1);
                break;
            }
        }
    }
}


class Mard {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
        this.energy = 1;
        this.hungry = true;
        this.qayl = 1000;
        this.hivand = 0;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(ch) {
        this.getNewCoordinates()
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }


    move() {

        let emptyCell0 = this.chooseCell(0)
        let emptyCell1 = this.chooseCell(1)


        let newCell0 = emptyCell0[Math.floor(Math.random() * emptyCell0.length)];
        let newCell1 = emptyCell1[Math.floor(Math.random() * emptyCell1.length)];

        let arr = [newCell0, newCell1]

        let newCell = random(arr)

        if (newCell) {
            let j = newCell[0]
            let k = newCell[1]
            if (matrix[j][k] == 0) {
                let newX = newCell[0];
                let newY = newCell[1];
                matrix[newY][newX] = 4
                matrix[this.y][this.x] = 0;
                this.x = newX
                this.y = newY
            } else if (matrix[j][k] == 1) {
                let newX = newCell[0];
                let newY = newCell[1];
                matrix[newY][newX] = 4
                matrix[this.y][this.x] = 1;
                this.x = newX
                this.y = newY
            }
            this.qayl--
        }

    }
    mul() {
        let emptyCell = this.chooseCell(4)

        let emptyCell0 = this.chooseCell(0)
        let emptyCell1 = this.chooseCell(1)

        let arr = emptyCell0.concat(emptyCell1)

        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        let Cell = emptyCell[Math.floor(Math.random() * arr.length)];

        if (Cell && newCell && this.energy == 1) {
            for (let i in MardArr) {
                let X = newCell[0];
                let Y = newCell[1];
                if (X == MardArr[i].x && Y == MardArr[i].y) {
                    if (MardArr[i].energy == 1) {
                        let newX = Cell[0];
                        let newY = Cell[1];
                        matrix[newY][newX] = 4;
                        let newMard = new Mard(newX, newY)
                        MardArr.push(newMard);
                        this.energy = 0;
                        MardArr[i].energy = 0;
                    }
                }
            }
        }

        if (this.qayl <= 0) {
            this.die();
        }
    }

    eat() {
        let emptyCell = this.chooseCell(3)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.hungry == true) {
            this.hungry = false;
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            for (let i = 0; i < GishatichArr.length; i++) {
                if (GishatichArr[i].x == this.x && GishatichArr[i].y == this.y) {
                    GishatichArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX
            this.y = newY
        } else {
            this.hungry = false
            this.move();
        }

        this.mul();
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < MardArr.length; i++) {
            if (MardArr[i].x == this.x && MardArr[i].y == this.y) {
                MardArr.splice(i, 1);
                break;
            }
        }

    }
}



class Virus {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(ch) {
        this.getNewCoordinates()
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        let emptyCell0 = this.chooseCell(0);
        let emptyCell1 = this.chooseCell(1);
        let emptyCell2 = this.chooseCell(2);
        let emptyCell3 = this.chooseCell(3);


        let newCell0 = random(emptyCell0);
        let newCell1 = random(emptyCell1);
        let newCell2 = random(emptyCell2);
        let newCell3 = random(emptyCell3);

        let arr = [newCell0, newCell1, newCell2, newCell3];

        let newCell = random(arr)


        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            if (matrix[newY][newX] == 0) {
                matrix[newY][newX] = 5
                matrix[this.y][this.x] = 0;
                this.x = newX
                this.y = newY
            }
            else if (matrix[newY][newX] == 1) {
                matrix[newY][newX] = 5
                matrix[this.y][this.x] = 1;
                this.x = newX
                this.y = newY
            }
            else if (matrix[newY][newX] == 2) {
                matrix[newY][newX] = 5
                matrix[this.y][this.x] = 2;
                this.x = newX
                this.y = newY
            }
            else if (matrix[newY][newX] == 3) {
                matrix[newY][newX] = 5
                matrix[this.y][this.x] = 3;
                this.x = newX
                this.y = newY
            }
        }

    }

    varakel() {
        let emptyCell4 = this.chooseCell(4)
        let newCell = random(emptyCell4)

        if (newCell) {
            for (let i in MardArr) {
                let X = newCell[0];
                let Y = newCell[1];
                if (X == MardArr[i].x && Y == MardArr[i].y) {
                    MardArr[i].hivand = 20;
                }
            }
        }

        this.move()
    }
}