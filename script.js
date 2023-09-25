window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    console.log("domLoaded()");

    const resetButton = document.getElementById("reset");
    const reduceButton = document.getElementById("reduce");

    reduceButton.addEventListener("click", reduceMatrix);
    resetButton.addEventListener("click", resetMatrix);
}

//on reduce button, pull numbers from cells and perform reduction
function reduceMatrix() {
    console.log("reduceMatrix()");

    //make sure all 6 cells have numbers
    verifyNumbers();
    let matrix = getMatrix();
    console.log(matrix)
    
    //perform reduction on 2d array

    //STEP 1: Divide row 1 by matrix[0][0] to make matrix[0][0] = 1
    let temp = matrix[0][0];
    for (let i = 0; i < matrix[0].length; i++) {
        matrix[0][i] /= temp;
    }
    // console.log("After step 1")
    // console.log(matrix);

    //STEP 2: Multiply row 1 by -matrix[1][0] and add row 1 to row 2
    temp = -matrix[1][0];
    for (let i = 0; i < matrix[0].length; i++) {
        matrix[1][i] = parseFloat(matrix[1][i]) + (matrix[0][i] * temp);
    }
    // console.log("After step 2");
    // console.log(matrix);

    //STEP 3: Multiply row 2 by 1/matrix[1][1] to make matrix[1][1] = 1
    temp = matrix[1][1];
    for (let i = 0; i < matrix[0].length; i++) {
        matrix[1][i] /= temp;
    }
    // console.log("After step 3");
    // console.log(matrix);

    //STEP 4: Multiply row 2 by -matrix[0][1] and add row 2 to row 1
    temp = -matrix[0][1];
    for (let i = 0; i < matrix[0].length; i++) {
        matrix[0][i] = parseFloat(matrix[0][i]) + (matrix[1][i] * temp);
    }
    // console.log("After step 4");
    console.log(matrix);    

    // console.log("x = " + matrix[0][2])
    // console.log("y = " + matrix[1][2])
}

//verify each cell has a number only
function verifyNumbers() {
    console.log("verifyNumbers()");

    let hasError = false;
    
    //obtain all cells
    const cells = document.querySelectorAll(".cell");
    
    //for each cell, check if it's value is not a number
    cells.forEach((cell) => {
        if(isNaN(cell.value) || cell.value === "") {
            hasError = true;
        }
    });
    
    //set error message accordingly
    const error = document.getElementById("error");
    if(hasError) {
        error.innerHTML = "Please ensure each cell has a number.";
    }
    else {
        error.innerHTML = "";
    }

}

//return the 2d array of numbers
function getMatrix() {
    console.log("getMatrix()");
    
    let matrix = [];

    //obtain 2 rows in matrix
    const matrixRows = document.querySelectorAll(".row");

    matrixRows.forEach((row) => {
        let resultRow = [];
          
        //obtain 3 cells in each row
        const matrixCells = row.querySelectorAll(".cell");

        matrixCells.forEach((cell) => {
            resultRow.push(cell.value);
        });

        matrix.push(resultRow);
    });

    return matrix;
}

//on reset button, clear the matrix cells
function resetMatrix() {
    console.log("resetMatrix()");

    //clear any previous results or errors
    document.getElementById("result").innerHTML = "";
    document.getElementById("error").innerHTML = "";

    //reset all cells to empty
    const matrixCells = document.getElementsByClassName("cell");

    for (let i = 0; i < matrixCells.length; i++) {
        matrixCells[i].value = "";
    }
}