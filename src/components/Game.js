import React, { useState } from 'react';
import Scoreboard from './Scoreboard';

import { isValid, getFinalScore, evaluate } from '../services/GameEngine'
import toast, { Toaster } from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';
import { completeGame, submitGuess } from '../features/statistics/statisticsSlice';

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
        _scoreboards = Array(6).fill(Array(8).fill({top:'', bottom: ''}));
        _input = 0
    }

    const [currentInput, setCurrentInput] = useState(_input)
    const [scoreboards, setScoreboards] = useState(_scoreboards)

    const finalScore = getFinalScore();

    function handleSubmit(topScores, bottomScores) {
        const verify = isValid(topScores, bottomScores)

        if (!verify.isValid) {
            toast.error(verify.message, {style: {
                background: '#333',
                color: '#fff',
              }})
            return;
        }

        const { evalArr, hasWon } = evaluate(topScores, bottomScores)

        const newScores = scoreboards.slice(0)
        newScores[currentInput] = evalArr

        setScoreboards(newScores)

        if (hasWon) {
            toast.success('Genius!', {style: {
                background: '#333',
                color: '#fff',
              }});
            setCurrentInput(-1)
            dispatch(completeGame({
                win: true,
                guesses: currentInput+1,
            }))
            dispatch(submitGuess({
                currentGame: {
                    input: -1,
                    boards: newScores
                },
                lastPlayed: currentDate
            }))
        } else if (currentInput === 5) {
        } else {
            dispatch(submitGuess({
                currentGame: {
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