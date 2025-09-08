"use client"

import wsClient from "@/lib/wsClient";
import {useEffect, useState} from "react";
import PanelButton from "@/app/components/button/PanelButton";
import {toast, Toaster} from "react-hot-toast";

export default function TestingPage() {

    useEffect(() => {
        wsClient.connect("ws://localhost:8080/ws");

        const onEvent = (data) => console.log("📥 Evento completo:", data);
        const onResponse = (payload) => console.log("📥 Respuesta:", payload.message);
        const onError = (payload) => toast.error(payload.message);
        const onCommand = (cmd) => console.log("📥 Comando:", cmd.label);

        wsClient.on("event", onEvent);
        wsClient.on("RESPONSE", onResponse);
        wsClient.on("ERROR", onError);
        wsClient.on("command", onCommand);

        return () => {
            wsClient.off("event", onEvent);
            wsClient.off("RESPONSE", onResponse);
            wsClient.off("ERROR", onResponse);
            wsClient.off("command", onCommand);
            wsClient.disconnect();
        };
    }, []);

    return (
        <div>
            <h1 className={"font-bold pb-8"}>Testing</h1>

            <Toaster />

            <div>
                <PanelButton displayText={"Test tarea"} onClick={() => wsClient.sendCommand("test arg1 arg2 arg3")}/>
            </div>

        </div>
    )
}