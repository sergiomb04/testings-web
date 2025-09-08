"use client"

import wsClient from "@/lib/wsClient";
import {useEffect, useState} from "react";

export default function TestingPage() {

    const [error, setError] = useState(null);

    useEffect(() => {
        wsClient.connect("ws://localhost:8080/ws");

        const onEvent = (data) => console.log("📥 Evento completo:", data);
        const onResponse = (payload) => console.log("📥 Respuesta:", payload.message);
        const onError = (payload) => {
            console.log("❌ Error:", payload.message);
            setError(payload.message)
        }
        const onCommand = (cmd) => console.log("📥 Comando:", cmd.label);
        const onOpen = () => {
            wsClient.sendCommand("test arg1 arg2 arg3");
            //wsClient.sendEvent("RESPONSE", { message: "Test log en plan fak" });
        };

        wsClient.on("event", onEvent);
        wsClient.on("RESPONSE", onResponse);
        wsClient.on("ERROR", onError);
        wsClient.on("command", onCommand);
        wsClient.on("open", onOpen);

        return () => {
            wsClient.off("event", onEvent);
            wsClient.off("RESPONSE", onResponse);
            wsClient.off("ERROR", onResponse);
            wsClient.off("command", onCommand);
            wsClient.off("open", onOpen);

            wsClient.disconnect();
        };
    }, []);

    return (
        <div>
            <h1 className={"font-bold pb-8"}>Testing</h1>

            {error && (
                <div className="p-4 rounded-2xl bg-red-100 text-red-700 shadow-md mb-4">
                    <strong>❌ Error:</strong> {error}
                </div>
            )}
        </div>
    )
}