const gameBoardScreen = require('./src/game-board/game-board-screen');
const eventsKeyboard = require('./src/game-board/events-keyboard');
const Events = eventsKeyboard(gameBoardScreen);
gameBoardScreen.setConfig({
    playerPlace: 1,
    nickName:'FAS'
});
Events.initKeypressEvents();