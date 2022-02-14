import React from "react";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

import styles from "./Modal.module.css";

export default function Modal({ handleClose, show, content }) {
    const showHideClass = show ? "display-block" : "display-none"
    return (
        <div 
            className={`${styles.modal} ${styles[showHideClass]}`}
            onClick={handleClose}
        >
            <section 
                className={styles["content"]}
                onClick={(e) => {e.stopPropagation()}}
            >
                <div
                    className={styles.close}
                    onClick={handleClose}
                >
                    <Icon
                        path={mdiClose}
                        size={1}
                    />
                </div>
                {content}
            </section>
        </div>
    )
}