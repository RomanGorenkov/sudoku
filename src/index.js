module.exports = function solveSudoku(matrix) {
    let valueLimit = 9;
    let unSignedCells = getArrayOfUnSignedCell(matrix);
  
    for(let i = 0; i < unSignedCells.length;) {
      let row = unSignedCells[i].row;
      let col = unSignedCells[i].col;
      let done = false;
      let value = matrix[row][col] + 1; // bust value in cell
  
      for(; !done && value <= valueLimit; value++) {
        if(checkValue(matrix, row, col, value)) {
          matrix[row][col] = value;
          done = true;
          i++;
        }
      }  
  
      if(!done) { // back step, to find true value
        matrix[row][col] = 0;
        i--;
      }
    }
  
    return matrix;
  };
  
  function getArrayOfUnSignedCell(matrix){
  

    let unSignedCells = [];
  
    for( let i = 0; i<9;i++){
      for(let j = 0; j < 9; j++){
        if(matrix[i][j] == 0){
          let cell = {
            'row': i,
            'col': j,
          }
          unSignedCells.push(cell);
        }
      }
    }
    return unSignedCells;
  }
  
  function checkRow(matrix, row, value) {
    for(let i = 0; i < 9; i++) {
      if(matrix[row][i] === value) {
        return false;
      }
    }
  
    return true;
  }
  
  function checkColumn(matrix, column, value) {
    for(let i = 0; i < 9; i++) {
      if(matrix[i][column] === value) {
        return false;
      }
    }
  
    return true;
  }
  
  function checkBox(matrix, row, col, value) {
  
    let boxStart = findBox(row,col);

    for(let i = 0; i<3;i++){
        for(let j = 0;j<3;j++){
            let checkColValue = matrix[boxStart.row+i][boxStart.col+j];
            if(checkColValue == value){
                return false;
            }
        }
    }
    
    return true;
  }

  function findBox(row,col){
    let boxStart = {
      'row': Math.floor(row/3)*3,
      'col': Math.floor(col/3)*3
    }
    return boxStart;
  }
  
  function checkValue(matrix, row, column, value) {
    if(!(checkRow(matrix, row, value) &&
          checkColumn(matrix, column, value) &&
            checkBox(matrix, row, column, value))) {
      return false;
    } 
  
    return true;
  }



  function printOut(mas){
    let arr = mas;
    arr.push(arrText='');
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        if(j % 3 == 0){
          arrText+=' ';
        }
          arrText+=arr[i][j]+' ';
      }
      console.log(arrText);
      if( (i + 1) % 3 == 0){
        console.log(' ');
      }
      arrText='';
  }
  console.log("--------------------------------------------");
  }
  