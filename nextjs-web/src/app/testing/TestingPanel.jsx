"use client"

import PanelButton from "@/app/components/button/PanelButton";
import wsClient from "@/lib/wsClient";
import {useEffect, useState} from "react";

export default function TestingPanel() {

    const [testFront, setTestFront] = useState(null)

    useEffect(() => {
        wsClient.connect("ws://localhost:8080/ws");

        wsClient.on("open", () => {
            wsClient.sendCommand("test");
        })

        const onSyncData = (payload) => {
            setTestFront("Contador:" + payload.count);
        }
        const onCommand = (cmd) => {
            if (cmd.label.startsWith("testFrontend ")) {
                setTestFront(cmd.label.replace("testFrontend ", ""))
            }
            console.log("📥 Comando:", cmd);
        }

        wsClient.on("SYNC_DATA", onSyncData);
        wsClient.on("command", onCommand);

        return () => {
            wsClient.off("RESPONSE", onSyncData);
            wsClient.off("command", onCommand);
            wsClient.disconnect();
        };
    }, []);

    return (
        <div>
            <PanelButton displayText={"Test tarea"} onClick={() => wsClient.sendCommand("test")}/>

            {testFront && <p>{testFront}</p>}

        </div>
    )
}