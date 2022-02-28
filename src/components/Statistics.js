import React, { useEffect, useState } from "react"
import Icon from "@mdi/react"
import { mdiChartBar, mdiShareVariant } from "@mdi/js"

import Modal from "./Modal"
import toast from 'react-hot-toast';

import { useSelector } from "react-redux"
import { getGame, getGameId } from "../services/GameEngine";

export default function Statistics() {
    const [showModal, setShowModal] = useState(false)
    const played = useSelector((state) => state.statistics.gamesPlayed)
    const wins = useSelector((state) => state.statistics.wins)
    const currentStreak = useSelector((state) => state.statistics.currentStreak)
    const maxStreak = useSelector((state) => state.statistics.maxStreak)

    const gameFinished = useSelector((state) => state.statistics.finished)
    const hasWon = useSelector((state) => state.statistics.won)

    const currentGame = useSelector((state) => state.statistics.currentGame)

    const [showModalTimer, setShowModalTimer] = useState(null);

    const gameInfo = getGame(getGameId())

    useEffect(() => {
        if (gameFinished) {
            const timer = setTimeout(() => {
                setShowModal(true)
            }, 1000)
            setShowModalTimer(timer);
        } else if (showModalTimer) {
            clearTimeout(showModalTimer);
        }
        //eslint-disable-next-line
    }, [gameFinished])

    function toggleModal() {
        setShowModal(!showModal);
    }

    function handleClick() {
        let result = `Curldle ${currentGame.gameId} ${hasWon?currentGame.gameGuesses.length:'X'}/6\n`
        for (let i = 0; i < currentGame.gameGuesses.length; i++) {
            const board = currentGame.gameGuesses[i]
            result+='\n'
            for (const square of board) {
                let emoji;
                switch(square.eval) {
                    case 'correct':
                        emoji = '🟦'
                        break;
                    case 'present':
                        emoji = '🟥'
                        break;
                    default:
                        emoji = '⬛'
                }
                result+=emoji
            }
        }
        result+="\nhttps://curldle.com"
        navigator.clipboard.writeText(result)
            .then(() => {
                toast('Copied!', {
                    icon: '📋'
                })   
            })
            .catch(() => {
                toast.error('Share Failed. If you are on an embedded browser, try using your default browser.')
            })
        
    }

    const winPercent = played === 0? 0 : Math.round((wins/played)*100);

    const modalContent = (
        <div className="flex flex-col items-center">
            <h2 className="font-bold text-xl mb-2">Statistics</h2>
            <div className="flex justify-center mb-4">
                <div className="flex flex-col items-center text-center m-2"><h1 className="font-bold text-2xl">{played}</h1><p>Played</p></div>
                <div className="flex flex-col items-center text-center m-2"><h1 className="font-bold text-2xl">{winPercent}</h1><p>Win %</p></div>
                <div className="flex flex-col items-center text-center m-2"><h1 className="font-bold text-2xl">{currentStreak}</h1><p>Current Streak</p></div>
                <div className="flex flex-col items-center text-center m-2"><h1 className="font-bold text-2xl">{maxStreak}</h1><p>Max Streak</p></div>
            </div>
            { gameFinished && 
                <>
                    <button className="bg-sky text-white flex items-center cursor-pointer rounded-md text-xl font-bold tap-highlight p-2 hover:opacity-90" onClick={handleClick}>
                        SHARE
                        <Icon
                            path={mdiShareVariant}
                            size={1}
                        />
                    </button>
                    <hr className="my-4 mx-auto w-full"></hr>
                    <h2 className="font-bold text-xl mb-2">Today's Game</h2>
                    <a className="underline" href={gameInfo.link} target="_blank" rel="noreferrer noopener">{gameInfo.topTeam} vs. {gameInfo.bottomTeam}</a>
                    <p>in the {gameInfo.year} {gameInfo.eventName}</p>
                </>
            }
        </div>
    )

    return (
        <div>
            <div className="cursor-pointer">
                <Icon
                    path={mdiChartBar}
                    size={1}
                    onClick={toggleModal}
                />
            </div>
            <Modal
                show={showModal}
                handleClose={toggleModal}
                content={modalContent}
            />
        </div>
    )
}