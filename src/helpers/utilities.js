function arrayToMatrix(array, cols){
    const matrix = [];
    for(let i =0; i<= array.length-cols; i=i+cols){
        matrix.push(array.slice(i, i + cols));
    }
    return matrix;
}

function clearScreen(){
    return process.stdout.write('\033c');
}

module.exports = {
    arrayToMatrix,
    clearScreen
}