import React, { useState } from "react"
import Icon from "@mdi/react"
import { mdiHelpCircleOutline } from "@mdi/js"
import Modal from "./Modal"
import Scoreboard from "./Scoreboard"

import styles from "./HowTo.module.css"

const exampleScoreboard = [
    {top:2,bottom:0,eval:'none'},
    {top:0,bottom:1,eval:'correct'},
    {top:0,bottom:0,eval:'present'},
    {top:2,bottom:0,eval:'none'},
    {top:0,bottom:2,eval:'present'},
    {top:1,bottom:0,eval:'present'},
    {top:0,bottom:1,eval:'correct'},
    {top:0,bottom:0,eval:'none'}
]

export default function HowTo() {
    const [showModal, setShowModal] = useState(true);

    function toggleModal() {
        setShowModal(!showModal);
    }

    const modalContent = (
        <div>
            <h1>How To Play</h1>
            <p>Guess the score in six tries.</p>
            <p>Each guess must be a valid score. Meaning: </p>
            <ol>
                <li>Only one team can score per end (frame). The other team's score must be 0.</li>
                <li>The total score for each team must match the given totals.</li>
                <li>The number of points per end must be between 0 and 8</li>
            </ol>
            <p>The top team always has Last Shot First End (Hammer).</p>
            <p>Every game is a full 8-end game (no conceded games or extra ends).</p>
            <p>After each guess, the color of the tiles will change to show how close your guess was to the score.</p>
            <hr className={styles.seperator} ></hr>
            <h3>Example</h3>
            <Scoreboard 
                type="display"
                score={exampleScoreboard}
                finalScore={{top: 5, bottom: 4}}
            />
            <p>The top team never scores 2 throughout the game.</p>
            <p>The bottom team scored 1 in end 2.</p>
            <p>There was one blank, however it did not occur in the 3rd end.</p>
            <hr className={styles.seperator} ></hr>
            <p>The scorelines are sourced from Grand Slam of Curling events.</p>
            <p><strong>There will be a new CURLDLE everyday!</strong></p>
        </div>
    )

    return (
        <div>
            <div className={styles.icon}>
                <Icon 
                    path={mdiHelpCircleOutline}
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