import React, { useState } from 'react';
import Scoreboard from './Scoreboard';

import { isValid, getFinalScore, evaluate, getScore, getGameNum } from '../services/GameEngine'
import toast from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';
import { startGame, completeGame, submitGuess } from '../features/statistics/statisticsSlice';

export default function Game(props) {
    const [gameNum] = useState(getGameNum())
    const lastPlayed = useSelector((state) => state.statistics.lastPlayed)
    const currentGame = useSelector((state) => state.statistics.currentGame)
    const dispatch = useDispatch()

    let _scoreboards;
    let _input;
    if (gameNum === lastPlayed) {
        _scoreboards = currentGame.boards
        _input = currentGame.input
    } else {
        let continueStreak = false;

        if (lastPlayed+1 === gameNum){ 
            continueStreak = true;
        }

        dispatch(startGame(continueStreak))
        _scoreboards = Array(6).fill(Array(8).fill({top:'', bottom: ''}));
        _input = 0
    }

    const [currentInput, setCurrentInput] = useState(_input)
    const [scoreboards, setScoreboards] = useState(_scoreboards)

    const finalScore = getFinalScore(gameNum);

    const toastStyle = {};

    function handleSubmit(topScores, bottomScores) {
        const verify = isValid(topScores, bottomScores, gameNum)

        if (!verify.isValid) {
            toast.error(verify.message, toastStyle)
            return;
        }

        const { evalArr, hasWon } = evaluate(topScores, bottomScores, gameNum)

        const newScores = scoreboards.slice(0)
        newScores[currentInput] = evalArr

        setScoreboards(newScores)

        if (hasWon) {
            toast.success('Genius!', toastStyle);
        } else if (currentInput === 5) {
            toast((t) => (
                <div>Correct Score:
                    <Scoreboard
                        type="display"
                        score={getScore(gameNum)}
                        finalScore={finalScore}
                    />
                </div>
            ), {style: {maxWidth: 'none'}})
        }
        if (hasWon || currentInput===5) {
            setCurrentInput(-1)
            dispatch(completeGame({
                win: hasWon,
                guesses: ''+ (currentInput+1),
            }))
            dispatch(submitGuess({
                currentGame: {
                    gameNum,
                    guesses: currentInput + 1,
                    input: -1,
                    boards: newScores
                },
                lastPlayed: gameNum
            }))
        } else {
            dispatch(submitGuess({
                currentGame: {
                    gameNum,
                    guesses: currentInput+1,
                    input: currentInput+1,
                    boards: newScores,
                },
                lastPlayed: gameNum
            }))
            setCurrentInput(currentInput+1)
        }
    }

    const scoreboardEls = []
    for (let i = 0; i < 6; i++) {
        if (i === currentInput) {
            scoreboardEls.push(
                <Scoreboard
                    key={i}
                    type="input"
                    submit={handleSubmit}
                    finalScore={finalScore}
                />
            )
        } else {
            scoreboardEls.push(
                <Scoreboard
                    key={i}
                    type="display"
                    score={scoreboards[i]}
                    finalScore={finalScore}
                />
            )
        }
    }

    return (
        <div>
            {scoreboardEls}
        </div>
    )
}