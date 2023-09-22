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
    matrix = getMatrix();
    
    //perform reduction on 2d array
    
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

    console.log(matrix);
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