import React from "react";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

export default function Modal({ handleClose, show, content }) {
    const showHideClass = show ? "visible opacity-100" : "invisible opacity-0"
    return (
        <div 
            className={`z-10 fixed top-0 left-0 flex items-center 
                        justify-center w-full h-full bg-black 
                        bg-opacity-50 overflow-auto transition-all ${showHideClass}`}
            onClick={handleClose}
        >
            <section 
                className="relative w-auto h-auto max-w-screen-sm bg-cloud sm:px-4 px-2 py-4 overflow-auto rounded-xl my-auto"
                onClick={(e) => {e.stopPropagation()}}
            >
                <div
                    className="cursor-pointer absolute top-4 right-4"
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