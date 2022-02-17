import React, { useEffect, useState } from 'react';
import Scoreboard from './Scoreboard';

import { isValid, getFinalScore, evaluate, getScore, getGameId } from '../services/GameEngine'
import toast from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';
import { startGame, completeGame, submitGuess } from '../features/statistics/statisticsSlice';

export default function Game(props) {
    const [gameId] = useState(getGameId())

    const lastGameId = useSelector((state) => state.statistics.lastGameId)
    const currentGame = useSelector((state) => state.statistics.currentGame)
    const finished = useSelector((state) => state.statistics.finished)
    const dispatch = useDispatch()

    const restoreScoreboards = () => {
        let _scoreboards;

        if (gameId === lastGameId) {
            _scoreboards = [];

            currentGame.gameGuesses.forEach((item) => {
                _scoreboards.push(item)
            })

            for (let i = _scoreboards.length; i < 6; i++) {
                _scoreboards.push(Array(8).fill({top:'', bottom: ''}))
            }
        } else {
            _scoreboards = Array(6).fill(Array(8).fill({top:'', bottom: ''}));
        }
        return _scoreboards;
    }

    const restoreInput = () => {
        if (lastGameId === gameId && finished) {
            return -1
        } else if (lastGameId === gameId){
            return currentGame.gameGuesses.length
        } else {
            return 0
        }
    }

    const [currentInput, setCurrentInput] = useState(restoreInput)
    const [scoreboards, setScoreboards] = useState(restoreScoreboards)

    useEffect(() => {
        if (gameId !== lastGameId) {
            dispatch(startGame({gameId}))
        }
    }, [dispatch, gameId, lastGameId])

    const finalScore = getFinalScore(gameId);

    const toastStyle = {};

    function handleSubmit(topScores, bottomScores) {
        const verify = isValid(topScores, bottomScores, gameId)

        if (!verify.isValid) {
            toast.error(verify.message, toastStyle)
            return;
        }

        const { evalArr, hasWon } = evaluate(topScores, bottomScores, gameId)

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
                        score={getScore(gameId)}
                        finalScore={finalScore}
                    />
                </div>
            ), {style: {maxWidth: 'none'}})
        }
        if (hasWon || currentInput===5) {
            dispatch(completeGame({
                win: hasWon,
                guesses: currentInput+1,
            }))
            setCurrentInput(-1)
        } else {
            setCurrentInput(currentInput+1)
        }
        dispatch(submitGuess({
            guess: evalArr,
            id: gameId
        }))
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