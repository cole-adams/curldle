import React, { useEffect, useState } from "react"
import Icon from "@mdi/react"
import { mdiChartBar, mdiShareVariant } from "@mdi/js"

import Modal from "./Modal"
import toast from 'react-hot-toast';

import styles from "./Statistics.module.css"

import { useSelector } from "react-redux"

import { getGameNum } from "../services/GameEngine"

export default function Statistics() {
    const [showModal, setShowModal] = useState(false)
    const played = useSelector((state) => state.statistics.played)
    const wins = useSelector((state) => state.statistics.wins)
    const currentStreak = useSelector((state) => state.statistics.currentStreak)
    const maxStreak = useSelector((state) => state.statistics.maxStreak)

    const gameFinished = useSelector((state) => state.statistics.gameFinished)
    const hasWon = useSelector((state) => state.statistics.hasWon)

    const currentGame = useSelector((state) => state.statistics.currentGame)

    useEffect(() => {
        if (gameFinished) {
            setTimeout(() => {
                setShowModal(true)
            }, 1000)
        }
    }, [gameFinished])

    function toggleModal() {
        setShowModal(!showModal);
    }

    function handleClick() {
        let result = `Curldle ${getGameNum()} ${hasWon?currentGame.guesses:'X'}/6\n`
        for (let i = 0; i < currentGame.guesses; i++) {
            const board = currentGame.boards[i]
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
        result+="\nhttps://curldle.netlify.com"
        navigator.clipboard.writeText(result)
        toast('Copied!', {
            icon: '📋'
        })   
    }

    const winPercent = played === 0? 0 : Math.round((wins/played)*100);

    const modalContent = (
        <div className={styles.container}>
            <h2 className={styles.title}>Statistics</h2>
            <div className={styles["num-stats"]}>
                <div className={styles["num-stats_item"]}><h1>{played}</h1><p>Played</p></div>
                <div className={styles["num-stats_item"]}><h1>{winPercent}</h1><p>Win %</p></div>
                <div className={styles["num-stats_item"]}><h1>{currentStreak}</h1><p>Current Streak</p></div>
                <div className={styles["num-stats_item"]}><h1>{maxStreak}</h1><p>Max Streak</p></div>
            </div>
            { gameFinished && <button className={styles.share} onClick={handleClick}>
                SHARE
                <Icon
                    path={mdiShareVariant}
                    size={1}
                />
            </button>}
        </div>
    )

    return (
        <div>
            <div className={styles.icon}>
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