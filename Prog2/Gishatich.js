class Gishatich extends LivingCreature {
    constructor(x, y) {
        super(x, y)
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

