"use client"

import PanelButton from "@/app/components/button/PanelButton";
import wsClient from "@/lib/wsClient";
import {useEffect, useState} from "react";

export default function TestingPanel() {

    const [testFront, setTestFront] = useState(null)

    useEffect(() => {
        wsClient.connect("ws://localhost:8080/ws");

        const onResponse = (payload) => console.log("📥 Respuesta:", payload.message);
        const onCommand = (cmd) => {
            if (cmd.label.startsWith("testFrontend ")) {
                setTestFront(cmd.label.replace("testFrontend ", ""))
            }
            console.log("📥 Comando:", cmd);
        }

        wsClient.on("RESPONSE", onResponse);
        wsClient.on("command", onCommand);

        return () => {
            wsClient.off("RESPONSE", onResponse);
            wsClient.off("command", onCommand);
            wsClient.disconnect();
        };
    }, []);

    return (
        <div>
            <PanelButton displayText={"Test tarea"} onClick={() => wsClient.sendCommand("test test-task")}/>

            {testFront && <p>{testFront}</p>}

        </div>
    )
}