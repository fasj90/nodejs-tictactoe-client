const Utilities = require('../helpers/utilities');
// const matchesHistory = require('../matches-history');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const SEPTUP = {
    nickName: '',
    matchName: null
};

module.exports = function (socket, options) {
    socket.on('receive available matches', selectMatch);

    const gameOptions = [
        { id: '1', title: 'Create new match', action: () => {
            socket.emit('new match', SEPTUP);
            options.onFinish();
        }},
        { id: '2', title: 'Join a match', action: () => {
            socket.emit('get available matches');
        }},
        { id: '3', title: 'View my matches', action: () => {
            // matchesHistory.showMatchesHistory(SEPTUP.nickName);
        }}
    ];

    async function init() {
        SEPTUP.nickName = await makeQuestion('Nickname: ');
        SEPTUP.whatDoYouWant = await makeQuestion(`${SEPTUP.nickName}, what do you want to do?: `,
            gameOptions.map(option => `${option.id}. ${option.title}`));
        gameOptions.find(option => option.id === SEPTUP.whatDoYouWant).action();
    }

    async function selectMatch(matches) {
        if(matches.length > 0) {
            const matchesChooise = matches.map((match, index) => `${index + 1}. ${match}`);
            const matchIndex = await makeQuestion('Select a match: ', matchesChooise);
            SEPTUP.matchName = matches[+matchIndex - 1];
            socket.emit('join to match', SEPTUP);
            options.onFinish();
        } else {
            Utilities.clearScreen();
            console.log('There aren`t match availables');
            console.log('Press ctrl + c to exit');
        }
    }

    return {
        init
    };
};

function makeQuestion(question, choices = []) {
    return new Promise((resolve, reject) => {
        const hasChoices = choices.length > 0;
        const breakLine = choices.length > 0 ? '\n' : ' ';
        const questionAndChoices = `${choices.join('\n')}${breakLine}${question}`;

        //Se hace la pregunta
        function onQuestion() {
            Utilities.clearScreen();
            rl.question(questionAndChoices, onAnswer);
        }

        function onAnswer(answer) {
            //console.log('makeQuestion', answer);
            //Si la pregunta NO tiene opciones o tienes la respuesta es valida
            if(!hasChoices
                || (hasChoices && +answer >= 1 && +answer <= choices.length)) {
                    //Se resuelve la promesa enviando la respuesta
                resolve(answer);
            } else {
                //De lo contrario se vuelve a preguntar hasta obtener una respuesta correcta
                onQuestion(question, choices);
            }
        }

        onQuestion();
    });
}