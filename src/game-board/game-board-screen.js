require('colors');
const Utilities = require('../helpers/utilities');
const { BOARD_SIZE, GAMER_CHAR } = require('../helpers/constants');
const Table = require('cli-table');
const data = Utilities
        .arrayToMatrix(Array(BOARD_SIZE * BOARD_SIZE).fill(' '), BOARD_SIZE);
let cursor = {
    currentPosition: { x: 1, y: 1 },
    previousPosition: null,
    previousPositionValue: null
}
let GAMER;
let playerPlace;
let nickName;
// instantiate
var table = new Table({
    "chars": {
        "top": "═", "top-mid": "╤", "top-left": "╔", "top-right": "╗"
        , "bottom": "═", "bottom-mid": "╧", "bottom-left": "╚", "bottom-right": "╝"
        , "left": "║", "left-mid": "╟", "mid": "─", "mid-mid": "┼"
        , "right": "║", "right-mid": "╢", "middle": "│"
    },
    "colAligns": ["middle", "middle", "middle"]
});

function setConfig(config){
    playerPlace = config.playerPlace;
    nickName = config.nickName;
    GAMER = `GAMER${playerPlace}`;
    updateCursor(cursor);
    drawScreen();
}

function drawHeader() {
    try {
        console.log('..::Tic Tac Toe::..'.bold.green);
        console.log('Gamer Nick:'.bold, nickName.bold.blue);
        const cursorChar = GAMER_CHAR[`${GAMER}_CURSOR`];
        const markChar = GAMER_CHAR[`${GAMER}_MARK`];
        console.log('Controlls:'.bold, 'Cursor:'.bold, `${cursorChar},`, 'Mark:'.bold, markChar);
    } catch(e) {}
}

function drawCurrentPosition(){
    const {currentPosition} = cursor;
    console.log(`Current position`.bold, 
                'X: ', `${currentPosition.x}`.bold.blue,
                'Y: ', `${currentPosition.y}`.bold.magenta);
}

function drawBoard() {
    //console.log(data);
    table.splice(0);
    data.forEach(row => {
        table.push(row);
    });

    console.log(table.toString());
}

function drawScreen(){
    Utilities.clearScreen();
    drawHeader();
    drawCurrentPosition();
    drawBoard();
}

function updateCursor(newCursor) {
    cursor = newCursor;
    data[cursor.currentPosition.y][cursor.currentPosition.x] = GAMER_CHAR[`${GAMER}_CURSOR`];

    if(cursor.previousPosition !== null) {
        data[cursor.previousPosition.y][cursor.previousPosition.x] = ' ';
    }
}

function getCursor() {
    return cursor;
}

module.exports = {
    setConfig,
    drawScreen,
    updateCursor,
    getCursor
}