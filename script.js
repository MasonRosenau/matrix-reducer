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

    document.getElementById("result").innerHTML = "";
    document.getElementById("error").innerHTML = "";

    //make sure all 6 cells have numbers, else return
    if(!verifyNumbers()){
        return;
    };

    //obtain matrix from input fields
    let matrix = getMatrix();
    
    //perform reduction on 2d array
    //STEP 1: Divide row 1 by matrix[0][0] to make matrix[0][0] = 1
    let temp = matrix[0][0];
    for (let i = 0; i < matrix[0].length; i++) {
        matrix[0][i] /= temp;
    }

    //STEP 2: Multiply row 1 by -matrix[1][0] and add row 1 to row 2
    temp = -matrix[1][0];
    for (let i = 0; i < matrix[0].length; i++) {
        matrix[1][i] = parseFloat(matrix[1][i]) + (matrix[0][i] * temp);
    }

    //STEP 3: Multiply row 2 by 1/matrix[1][1] to make matrix[1][1] = 1
    temp = matrix[1][1];
    for (let i = 0; i < matrix[0].length; i++) {
        matrix[1][i] /= temp;
    }

    //STEP 4: Multiply row 2 by -matrix[0][1] and add row 2 to row 1
    temp = -matrix[0][1];
    for (let i = 0; i < matrix[0].length; i++) {
        matrix[0][i] = parseFloat(matrix[0][i]) + (matrix[1][i] * temp);
    }
 
    //convert decimals to fractions
    const x = fractionObjToText(new Fraction(matrix[0][2]));
    const y = fractionObjToText(new Fraction(matrix[1][2]));

    //display results
    const result = document.getElementById("result");
    result.innerHTML = "x = " + x + "<br />" + "y = " + y;
}

//verify each cell has a number only
function verifyNumbers() {

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
        return false;
    }
    else {
        error.innerHTML = "";
        return true;
    }
}

//return the 2d array of numbers
function getMatrix() {
    
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

//convert fraction object to string
function fractionObjToText(fractionObj) {
    const sign = fractionObj.s === -1 ? '-' : '';
    const numerator = fractionObj.n;
    const denominator = fractionObj.d;
    
    return `${sign}${numerator}/${denominator}`;
}

//on reset button, clear the matrix cells
function resetMatrix() {

    //clear any previous results or errors
    document.getElementById("result").innerHTML = "";
    document.getElementById("error").innerHTML = "";

    //reset all cells to empty
    const matrixCells = document.getElementsByClassName("cell");

    for (let i = 0; i < matrixCells.length; i++) {
        matrixCells[i].value = "";
    }
}