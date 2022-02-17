import React from "react";
import styles from "./EndScore.module.css"

export default function EndScore({end, top, bottom, evaluation}) {
    const colorStyle = evaluation ? styles[evaluation] : '';
    const flipClass = evaluation ? styles['is-flipped'] : '';

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
        <div className={styles.scene}>
            <div className={`${styles.container} ${flipClass}`}>
                <div className={`${styles["face"]} ${styles["face__front"]}`}>{ tileDisplay }</div>
                <div className={`${styles["face"]} ${styles["face__back"]} ${colorStyle}`}>{ evaluation && tileDisplay }</div>
            </div>
        </div>
    )
}