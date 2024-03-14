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
var promptSync = require('prompt-sync')();
var matrix = [];
var rows = parseInt(promptSync('Enter number of rows: '));
var columns = parseInt(promptSync('Enter number of columns: '));
//>,-,-,A,,,s
console.log('Enter characters separated with commas, leave blank for empty places');
for (var i = 1; i <= rows; i++) {
    var line = promptSync("Row ".concat(i, ": "));
    matrix.push(line.split(','));
}
function getStartingPoint() {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === '>')
                return [i, j];
        }
    }
    return [-1, -1];
}
//I added this comment here because this function can be a lit confusing
//The idea of the currentDirection is if direction is like this ----> then we can not change direction <---- like this
function getDirection(currentIndexes, currentDirection) {
    var row = currentIndexes[0];
    var column = currentIndexes[1];
    if (column + 1 < matrix[0].length && matrix[row][column + 1] !== '' && currentDirection !== 'Left')
        return "Right";
    else if (column - 1 >= 0 && matrix[row][column - 1] !== '' && currentDirection !== 'Right')
        return "Left";
    else if (row + 1 < matrix.length && matrix[row + 1][column] !== '' && currentDirection !== 'Up')
        return "Down";
    else if (row - 1 >= 0 && matrix[row - 1][column] !== '' && currentDirection !== 'Down')
        return "Up";
    else
        return "InvalidMatrix";
}
var startingIndexes = getStartingPoint();
var character = matrix[startingIndexes[0]][startingIndexes[1]];
var currentDirection = getDirection(startingIndexes);
var letters = [];
var path = [];
var rowIndex = startingIndexes[0];
var columnIndex = startingIndexes[1];
character = '@';
while (character !== 's') {
    if (character === '+' || /[A-Z]/.test(character)) {
        currentDirection = getDirection([rowIndex, columnIndex], currentDirection);
        if (/[A-Z]/.test(character)) {
            letters.push(character);
        }
    }
    path.push(character);
    switch (currentDirection) {
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
console.log("Path: ", path.join('').toString() + 's');
console.log("Letters: ", letters.join('').toString());
