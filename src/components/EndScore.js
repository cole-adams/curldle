import React from "react";
import styles from "./EndScore.module.css"

export default function EndScore(props) {
    const colorStyle = props.evaluation ? styles[props.evaluation] : '';
    return (
        <div className={`${styles.container} ${colorStyle}`}>
            <p className={styles["end-title"]}>{props.end}</p>
            <hr className={styles.seperator}></hr>
            <h3 className={styles.score}>{props.top}</h3>
            <hr className={styles.seperator}></hr>
            <h3 className={styles.score}>{props.bottom}</h3>
        </div>
    )
}