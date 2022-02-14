import React from "react";
import HowTo from "./HowTo";

import styles from "./Header.module.css"

export default function Header() {
    return (
        <div className={styles.container}>
            <div className={styles.icon}><HowTo /></div>
            <h1 className={styles.title}>CURLDLE</h1>
        </div>
    )
}