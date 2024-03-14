
// const matrix: string [][] = [['>','-','-','-','A', '-', '-', '-', '+'],
//                             ['', '', '', '', '', '', '', '','|'],
//                             ['s', '-', 'B', '-', '+', '', '', '', 'C'],
//                             ['', '', '', '', '|', '', '', '', '|'],
//                             ['', '', '', '', '+', '-', '-', '-', '+']];

// const matrix: string [][] = [
//     ['>','-','-','-','A', '-', '@', '-', '+'],
//     ['', '', '', '', '', '', '', '','|'],
//     ['+', '-', 'U', '-', '+', '', '', '', 'C'],
//     ['|', '', '', '', '|', '', '', '', '|'],
//     ['s', '', '', '', 'C', '-', '-', '-', '+']
// ]
const promptSync = require('prompt-sync')();

let matrix: string [][]= [];

let rows: number = parseInt(promptSync('Enter number of rows: '))
let columns: number = parseInt(promptSync('Enter number of columns: '))

//>,-,-,A,,,s
console.log('Enter characters separated with commas, leave blank for empty places')
for(let i=1 ; i<=rows; i++){
    let line: string = promptSync(`Row ${i}: `)
    matrix.push(line.split(','))
}

function getStartingPoint(): Array<number> {
    for(let i = 0;  i<matrix.length; i++){
        for(let j = 0; j<matrix[0].length; j++){
            if(matrix[i][j] === '>')
                return [i, j];
        }
    }
    return [-1, -1]
}

//I added this comment here because this function can be confusing
//The idea of the currentDirection is if direction is like this ----> then we can not change direction <---- like this meaning that we would start going back from where we came
function getDirection(currentIndexes: Array<number>, currentDirection?: string): string {
    let row: number = currentIndexes[0];
    let column: number = currentIndexes[1];

    if(column+1 < matrix[0].length && matrix[row][column+1] !== '' && currentDirection !== 'Left')
        return "Right"
    else if(column-1 >=0 && matrix[row][column-1] !== '' && currentDirection !== 'Right')
        return "Left"
    else if(row+1 < matrix.length && matrix[row+1][column] !== '' && currentDirection !== 'Up')
        return "Down"
    else if(row-1 >=0 && matrix[row-1][column] !== '' && currentDirection !== 'Down')
        return "Up"
    else return "InvalidMatrix"
}

const startingIndexes: Array<number> = getStartingPoint()

let character: string = matrix [startingIndexes[0]][startingIndexes[1]]
let currentDirection: string = getDirection(startingIndexes);
let letters: Array<string> = []; 
let path: Array<string> = [];
let rowIndex: number = startingIndexes[0];
let columnIndex: number = startingIndexes[1];
character = '@'

while(character !== 's'){
    if(character === '+' || /[A-Z]/.test(character)){
        currentDirection = getDirection([rowIndex, columnIndex], currentDirection)

        if(/[A-Z]/.test(character)){
            letters.push(character);
        }
    }

    path.push(character)

    switch(currentDirection){
        case "Up":
            rowIndex--;
            break;
        case "Right":
            columnIndex++;
            break;
        case "Down":
            rowIndex++;
            break;
        case "Left":
            columnIndex--;
    }

    character = matrix[rowIndex][columnIndex];
}

console.log("Path: ", path.join('').toString()+'s');
console.log("Letters: ", letters.join('').toString());