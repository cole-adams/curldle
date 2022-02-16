import React, { useState } from 'react';
import Scoreboard from './Scoreboard';

import { isValid, getFinalScore, evaluate, getScore } from '../services/GameEngine'
import toast, { Toaster } from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';
import { startGame, completeGame, submitGuess } from '../features/statistics/statisticsSlice';

export default function Game(props) {
    const lastPlayed = useSelector((state) => state.statistics.lastPlayed)
    const currentGame = useSelector((state) => state.statistics.currentGame)
    const dispatch = useDispatch()

    const currentDate = (new Date()).toISOString().substring(0,10);
    
    let _scoreboards;
    let _input;
    if (currentDate === lastPlayed) {
        _scoreboards = currentGame.boards
        _input = currentGame.input
    } else {
        dispatch(startGame())
        _scoreboards = Array(6).fill(Array(8).fill({top:'', bottom: ''}));
        _input = 0
    }

    const [currentInput, setCurrentInput] = useState(_input)
    const [scoreboards, setScoreboards] = useState(_scoreboards)

    const finalScore = getFinalScore();

    const toastStyle = {};

    function handleSubmit(topScores, bottomScores) {
        const verify = isValid(topScores, bottomScores)

        if (!verify.isValid) {
            toast.error(verify.message, toastStyle)
            return;
        }

        const { evalArr, hasWon } = evaluate(topScores, bottomScores)

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
                        score={getScore()}
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
                    guesses: currentInput + 1,
                    input: -1,
                    boards: newScores
                },
                lastPlayed: currentDate
            }))
        } else {
            dispatch(submitGuess({
                currentGame: {
                    guesses: currentInput+1,
                    input: currentInput+1,
                    boards: newScores,
                },
                lastPlayed: currentDate
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
            <Toaster
                position="top-center"
            />
        </div>
    )
}