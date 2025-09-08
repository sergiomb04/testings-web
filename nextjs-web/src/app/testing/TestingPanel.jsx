"use client"

import PanelButton from "@/app/components/button/PanelButton";
import wsClient from "@/lib/wsClient";
import {useEffect, useState} from "react";

export default function TestingPanel() {

    const [content, setContent] = useState("")

    useEffect(() => {
        wsClient.connect("ws://localhost:8080/ws");

        const onOpen = () => {
            wsClient.sendCommand("getTest");
        }

        const onSyncData = (payload) => {
            setContent(payload.text);
        }
        const onCommand = (cmd) => {
            console.log("📥 Comando:", cmd);
        }

        wsClient.on("open", onOpen);
        wsClient.on("SYNC_DATA", onSyncData);
        wsClient.on("command", onCommand);

        return () => {
            wsClient.off("open", onOpen);
            wsClient.off("SYNC_DATA", onSyncData);
            wsClient.off("command", onCommand);
            wsClient.disconnect();
        };
    }, []);

    function updateContent(value) {
        setContent(value);
        const fixedValue = value.isEmpty ? " " : value;
        wsClient.sendCommand("test " + fixedValue)
    }

    return (
        <div className={"grid"}>
            <textarea
                className={"min-h-64 rounded-xl bg-neutral-700 border-1 p-2 focus:outline-none"}
                value={content}
                onChange={(e) => updateContent(e.target.value)}
            />
        </div>
    )
}