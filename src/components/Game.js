import styles from './Game.module.css'

import React, { useState, useRef } from 'react';
import Scoreboard from './Scoreboard';

import { isValid, getFinalScore, evaluate } from '../services/GameEngine'
import toast, { Toaster } from 'react-hot-toast';

export default function Game(props) {
    const _scoreboards = Array(6).fill(Array(8).fill({top:'', bottom: ''}));
    const [currentInput, setCurrentInput] = useState(0)
    const [scoreboards, setScoreboards] = useState(
        _scoreboards
    )

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
        } else {
            setCurrentInput(currentInput+1)
        }
    }

    function renderScoreboards() {
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
        return scoreboardEls
    }

    return (
        <div>
            {renderScoreboards()}
            <Toaster
                position="top-center"
            />
        </div>
    )
}