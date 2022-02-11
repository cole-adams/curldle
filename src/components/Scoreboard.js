import React, { useRef } from "react"
import EndScore from "./EndScore"

import styles from "./Scoreboard.module.css"

export default function Scoreboard(props) {
    let getTop;
    let getBottom;
    let getEval;

    const inputRefs = useRef([])

    if (props.type === "input") {
        const inputDef = (bot) => {
            return (i) => {
                return (
                    <input 
                        ref={el => inputRefs.current[(2*i+bot)] = el}
                        className={styles.input}
                        onKeyDown={e => { handleKeyDown(e, (2*i+bot))}}
                        onChange={e => { handleUpdate(e, (2*i+bot))}}
                    />
                )
            }
        }
        getTop = inputDef(0);
        getBottom = inputDef(1);
        getEval = () => undefined
    } else {
        getTop = (i) => { return props.score[i].top }
        getBottom = (i) => { return props.score[i].bottom }
        getEval = (i) => { return props.score[i].eval }
    }

    function handleUpdate(event, i) {
        if (i < 15 && event.target.value !== "") {
            inputRefs.current[i+1].focus()
        }
    }

    function handleKeyDown(event, i) {
        switch (event.key) {
            case 'Enter':
                const topVals = []
                const botVals = []
                for (let j = 0; j < inputRefs.current.length; j++) {
                    if (j%2===0) {
                        topVals.push(inputRefs.current[j].value)
                    } else {
                        botVals.push(inputRefs.current[j].value)
                    }
                }
                props.submit(topVals, botVals)
                break;
            case 'Backspace':
                if (i > 0 && event.target.value === "") {
                    inputRefs.current[i-1].focus()
                }
                break;
            default:
                break;
        }
    }

    function renderEndScores() {
        const ends = []
        for (let i = 0; i < 8; i++) {
            ends.push(
                <EndScore
                    key={i}
                    end={i+1}
                    top={getTop(i)}
                    bottom={getBottom(i)}
                    evaluation={getEval(i)}
                />
            )
        }
        return ends;
    }

    return (
        <div className={styles.container}>
            {renderEndScores()}
            <EndScore
                key={11}
                end="Total"
                top={props.finalScore.top}
                bottom={props.finalScore.bottom}
            />
        </div>
    )
}