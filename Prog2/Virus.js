class Virus extends LivingCreature {
    constructor(x, y) {
        super(x, y)
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