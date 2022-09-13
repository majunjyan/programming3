class Grass extends LivingCreature {
    
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
