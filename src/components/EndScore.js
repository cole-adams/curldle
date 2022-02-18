import React from "react";
import styles from "./EndScore.module.css"

import ReactCardFlip from "react-card-flip";

export default function EndScore({end, top, bottom, evaluation}) {
    const colorStyle = evaluation ? styles[evaluation] : '';

    const tileDisplay = (
        <>
            <p className={styles["end-title"]}>{end}</p>
            <hr className={styles.seperator}></hr>
            <h3 className={styles.score}>{top}</h3>
            <hr className={styles.seperator}></hr>
            <h3 className={styles.score}>{bottom}</h3>
        </>
    )

    return (
        <ReactCardFlip
            isFlipped={evaluation}
        >
            <div className={`${styles.container} ${styles["face__front"]}`}> { tileDisplay } </div>
            <div className={`${styles.container} ${colorStyle}`}>{ evaluation && tileDisplay }</div>
        </ReactCardFlip>
    )
}