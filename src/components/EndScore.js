import React from "react";

import ReactCardFlip from "react-card-flip";

export default function EndScore({end, top, bottom, evaluation}) {
    let colorStyle;

    switch (evaluation) {
        case 'correct':
            colorStyle = 'bg-sky'
            break;
        case 'present':
            colorStyle = 'bg-red'
            break;
        case 'none':
            colorStyle = 'bg-navy-500'
            break;
        default:
            colorStyle = 'bg-concrete'
    }

    const tileDisplay = (
        <>
            <p className="mx-1 text-sm">{end}</p>
            <hr className="border-navy-400 border m-0 bg-navy-400"></hr>
            <h3 className="m-1 text-center h-7 font-bold text-lg">{top}</h3>
            <hr className="border-navy-400 border m-0 bg-navy-400"></hr>
            <h3 className="m-1 text-center h-7 font-bold text-lg">{bottom}</h3>
        </>
    )
    
    return (
        <ReactCardFlip
            isFlipped={evaluation}
        >
            <div className={`h-full border-2 border-navy-400 rounded-md text-white w-10 text-center -mx-px bg-concrete`}> { tileDisplay } </div>
            <div className={`h-full border-2 border-navy-400 rounded-md text-white w-10 text-center -mx-px ${colorStyle}`}> { evaluation && tileDisplay }</div>
        </ReactCardFlip>
    )
}