import gamesData from '../data/games.json';

const GAME_FORMAT_CHANGE_ID = 369;

const games = gamesData.games;

const sum = (pre, cur) => pre + cur;

function getGameId() {
    const firstDay = Date.parse('2022-02-15');

    const now = new Date();
    const timezoneOffsetMS = now.getTimezoneOffset() * 6e4

    const days = Math.floor((now - (firstDay + timezoneOffsetMS)) / 8.64e7)
    return days
}

function getGame(id) {
    const game = games[(id - GAME_FORMAT_CHANGE_ID) % games.length]
    return game;
}

function getGameScore(id) {
    const game = getGame(id)
    const scoresAsNum = game.score.map(arr => {
        return arr.map(item => {
            return parseInt(item)
        })
    })
    return scoresAsNum;
}

function getFinalScore(id) {
    const score = getGameScore(id)
    return {
        top: score[0].reduce(sum),
        bottom: score[1].reduce(sum)
    }
}

function getFormattedScore(id) {
    const game = getGameScore(id)
    const out = []
    for (let i = 0; i < game[0].length; i++) {
        out.push({
            top: game[0][i],
            bottom: game[1][i]
        })
    }

    return out
}

function isValid(top, bottom, id) {
    const topNums = [];
    const bottomNums = [];

    for (let i = 0; i < top.length; i++) {
        if (top[i] === '') {
            top[i] = '0'
        }
        if (bottom[i] === '') {
            bottom[i] = '0'
        }
        if (top[i] !== '0' && bottom[i] !== '0') {
            return {
                isValid: false,
                message: `Invalid. Both teams can't score in end ${i + 1}`
            }
        }
        const topNum = Number.parseInt(top[i])
        const botNum = Number.parseInt(bottom[i])

        if (topNum < 0 || botNum < 0 || topNum > 8 || botNum > 8) {
            return {
                isValid: false,
                message: `Invalid score in end ${i + 1}`
            }
        }
        topNums.push(topNum);
        bottomNums.push(botNum);
    }
    const finalScore = getFinalScore(id)

    if (topNums.reduce(sum) !== finalScore.top ||
        bottomNums.reduce(sum) !== finalScore.bottom) {
        return {
            isValid: false,
            message: `Invalid. Scoreboard doesn't match final score`
        }
    }

    return {
        isValid: true
    }
}

function evaluate(topStr, bottomStr, id) {
    const score = getGameScore(id)
    const top = topStr.map(item => Number.parseInt(item))
    const bottom = bottomStr.map(item => Number.parseInt(item))

    const evalArr = Array(8)

    const scoreUsed = Array(8)

    let numCorrect = 0;
    for (let i = 0; i < top.length; i++) {
        if (top[i] === score[0][i] && bottom[i] === score[1][i]) {
            scoreUsed[i] = true
            evalArr[i] = {
                top: top[i],
                bottom: bottom[i],
                eval: 'correct'
            }
            numCorrect++;
        }
    }

    for (let i = 0; i < top.length; i++) {
        if (evalArr[i]) {
            continue;
        }
        for (let j = 0; j < top.length; j++) {
            if (!scoreUsed[j] && top[i] === score[0][j] && bottom[i] === score[1][j]) {
                scoreUsed[j] = true
                evalArr[i] = {
                    top: top[i],
                    bottom: bottom[i],
                    eval: 'present'
                }
                break;
            }
        }
        if (!evalArr[i]) {
            evalArr[i] = {
                top: top[i],
                bottom: bottom[i],
                eval: 'none'
            }
        }
    }

    return {
        evalArr: evalArr,
        hasWon: numCorrect === 8
    }
}

export { isValid, getFinalScore, evaluate, getGameId, getFormattedScore, getGame }