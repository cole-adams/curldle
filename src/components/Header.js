import React from "react";
import HowTo from "./HowTo";
import Statistics from "./Statistics";

export default function Header() {
    return (
        <div className="w-full flex items-center justify-between p-6">
            <HowTo />
            <h1 className="text-3xl font-bold">CURLDLE</h1>
            <Statistics />
        </div>
    )
}