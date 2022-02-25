import React, { useEffect, useState } from "react"
import Icon from "@mdi/react"
import { mdiHelpCircleOutline } from "@mdi/js"
import Modal from "./Modal"
import Scoreboard from "./Scoreboard"

const exampleScoreboard = [
    {top:1,bottom:0,eval:'present'},
    {top:0,bottom:0,eval:'present'},
    {top:0,bottom:2,eval:'correct'},
    {top:1,bottom:0,eval:'correct'},
    {top:0,bottom:1,eval:'correct'},
    {top:4,bottom:0,eval:'none'},
    {top:0,bottom:0,eval:'none'},
    {top:0,bottom:2,eval:'present'}
]

export default function HowTo() {
    const [showModal, setShowModal] = useState(() => {
        const saved = JSON.parse(localStorage.getItem("firstTime"));
        return saved===null
    });

    useEffect(() => {
        localStorage.setItem("firstTime", JSON.stringify(false))
    }, [])

    function toggleModal() {
        setShowModal(!showModal);
    }

    const seperator = <hr className="border border-navy-400"></hr>

    const modalContent = (
        <div>
            <h2 className="font-bold text-2xl mb-2">How To Play</h2>
            <p>Guess the score in six tries.</p>
            <p>Each guess must be a valid score. Meaning: </p>
            <ol className="list-decimal my-4 pl-10">
                <li className="list-item">Only one team can score per end (frame). The other team's score must be 0.</li>
                <li className="list-item">The total score for each team must match the given totals.</li>
                <li className="list-item">The number of points per end must be between 0 and 8</li>
            </ol>
            <p>The top team always has Last Shot First End (Hammer).</p>
            <p>Every game is a full 8-end game (no conceded games or extra ends).</p>
            <p>After each guess, the color of the tiles will change to show how close your guess was to the score.</p>
            <p><span className="text-sky font-bold">Blue</span> means that score occured in that end.</p>
            <p><span className="text-red font-bold">Red</span> means that score occured in the game, but not in the end its placed.</p>
            <p><span className="text-navy-500 font-bold">Black</span> means that score never occured in the game.</p>
            {seperator}
            <h3 className="font-bold text-xl mb-2">Example</h3>
            <Scoreboard 
                type="display"
                score={exampleScoreboard}
                finalScore={{top: 6, bottom: 5}}
            />
            <p>The top team never scores 4 throughout the game.</p>
            <p>The bottom team scored 2 in end 3.</p>
            <p>The top team scored 1, however it did not occur in the 1st end.</p>
            <p>The there was one blank, however it did not occur in the 2nd end, and it did not occur in the 7th end.</p>
            {seperator}
            <p>The scorelines are sourced from Grand Slam of Curling events.</p>
            <p><strong>There will be a new CURLDLE everyday!</strong></p>
            {seperator}
            <p>Made by <a className="underline" href="https://twitter.com/cole_adams1">@cole_adams1</a></p>
        </div>
    )

    return (
        <div>
            <div className="cursor-pointer">
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