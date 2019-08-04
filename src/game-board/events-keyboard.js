const readline = require('readline');
const Constants = require('../helpers/constants');
module.exports = function(GameBoardScreen) {

    function initKeypressEvents() {
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.on('keypress', (str, key) => {
            // console.log('key', key);
            if(key.ctrl && key.name === 'c') {
                process.exit(0);
            } else if(Constants.KEY_MOVING.indexOf(key.name) !== -1) {
                // console.log('Mover cursor');
                onMoveCursor(key.name);
            }
        });
    }

    function onMoveCursor(direction) {
        const cursor = GameBoardScreen.getCursor();
        const previousPosition = { ...cursor.currentPosition };
        // console.log('previousPosition', previousPosition);
        if(direction === 'left' && cursor.currentPosition.x > 0) {
            cursor.currentPosition.x--;
        } else if(direction === 'right' && cursor.currentPosition.x < Constants.BOARD_SIZE - 1) {
            cursor.currentPosition.x++;
        } else if(direction === 'up' && cursor.currentPosition.y > 0) {
            cursor.currentPosition.y--;
        } else if(direction === 'down' && cursor.currentPosition.y < Constants.BOARD_SIZE - 1) {
            cursor.currentPosition.y++;
        }

        if(cursor.currentPosition.x !== previousPosition.x
            || cursor.currentPosition.y !== previousPosition.y) {
            cursor.previousPosition = previousPosition;
            GameBoardScreen.updateCursor(cursor);
        }

        GameBoardScreen.drawScreen();
    }

    return {
        initKeypressEvents
    }
}