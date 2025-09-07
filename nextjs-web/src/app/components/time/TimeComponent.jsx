"use client"

import {useEffect, useState} from "react";

export default function TimeComponent() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval); // limpiar al desmontar
    }, []);

    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const seconds = String(time.getSeconds()).padStart(2, "0");

    return (
        <div className={"flex flex-col bg-neutral-800 w-max p-4 px-16 rounded-xl items-center"}>
            <h1 className={"font-bold mb-2"}>Son las</h1>
            <h2 className={"font-semibold bg-neutral-900 rounded-xl w-64 text-center py-2"}>{`${hours}:${minutes}:${seconds}`}</h2>
        </div>
    )
}