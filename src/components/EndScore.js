import React from "react";
import styles from "./EndScore.module.css"

export default function EndScore(props) {
    const colorStyle = props.evaluation ? styles[props.evaluation] : '';
    const flipClass = props.evaluation ? styles['is-flipped'] : '';

    const tileDisplay = (
        <>
            <p className={styles["end-title"]}>{props.end}</p>
            <hr className={styles.seperator}></hr>
            <h3 className={styles.score}>{props.top}</h3>
            <hr className={styles.seperator}></hr>
            <h3 className={styles.score}>{props.bottom}</h3>
        </>
    )

    return (
        <div className={styles.scene}>
            <div className={`${styles.container} ${flipClass}`}>
                <div className={`${styles["face"]} ${styles["face__front"]}`}>{ tileDisplay }</div>
                <div className={`${styles["face"]} ${styles["face__back"]} ${colorStyle}`}>{ props.evaluation && tileDisplay }</div>
            </div>
        </div>
    )
}