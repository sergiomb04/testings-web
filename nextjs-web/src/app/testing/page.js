"use client"

import wsClient from "@/lib/wsClient";
import {useEffect} from "react";

export default function TestingPage() {

    useEffect(() => {
        wsClient.connect("ws://localhost:8080/ws");

        const onEvent = (data) => console.log("📥 Evento completo:", data);
        const onResponse = (payload) => console.log("📥 Respuesta:", payload.message);
        const onCommand = (cmd) => console.log("📥 Comando:", cmd.label);
        const onOpen = () => {
            wsClient.sendCommand("test arg1 arg2 arg3");
            wsClient.sendEvent("RESPONSE", { message: "Test log en plan fak" });
        };

        wsClient.on("event", onEvent);
        wsClient.on("RESPONSE", onResponse);
        wsClient.on("command", onCommand);
        wsClient.on("open", onOpen);

        return () => {
            wsClient.off("event", onEvent);
            wsClient.off("RESPONSE", onResponse);
            wsClient.off("command", onCommand);
            wsClient.off("open", onOpen);

            wsClient.disconnect();
        };
    }, []);

    return (
        <div>
            <h1 className={"font-bold pb-8"}>Testing</h1>
        </div>
    )
}