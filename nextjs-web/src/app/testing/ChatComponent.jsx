"use client"

import {useEffect, useState} from "react";

export default function ChatComponent() {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);

    const connectWebSocket = () => {
        setError(false); // resetear error al intentar conectar
        const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/ws`);

        ws.onopen = () => {
            console.log("Conectado al WebSocket");
            ws.send("Hola desde Next.js 👋");
        };

        ws.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };

        ws.onerror = () => {
            console.log("Error al conectar");
            setError(true);
        };

        ws.onclose = () => {
            console.log("Conexión cerrada");
        };

        setSocket(ws);
    };

    useEffect(() => {
        connectWebSocket();
        return () => {
            socket?.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(input);
            setInput("");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Chat con Java WebSocket</h1>

            {error && (
                <div className="mb-2 text-red-500">
                    No se pudo conectar al servidor.
                    <button
                        className="ml-2 bg-gray-500 text-white px-2 py-1 rounded"
                        onClick={connectWebSocket}
                    >
                        Reintentar
                    </button>
                </div>
            )}

            <div className="border p-2 h-64 overflow-y-auto">
                {messages.map((msg, i) => (
                    <div key={i} className="p-1 border-b">
                        {msg}
                    </div>
                ))}
            </div>

            <div className="flex gap-2 mt-2">
                <input
                    className="border p-2 flex-1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe un mensaje..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Enviar
                </button>
            </div>
        </div>
    );
}
