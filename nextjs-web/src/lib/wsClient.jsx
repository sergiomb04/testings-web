import {toast} from "react-hot-toast";

const onError = (payload) => toast.error(payload.message);

class WSClient {

    constructor() {
        this.socket = null;
        this.listeners = {};
        this.url = null;
        this.shouldReconnect = false;
    }

    connect(url) {
        if (this.socket) return;

        this.url = url;
        this.shouldReconnect = true;

        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log("✅ Conectado al WebSocket");
            wsClient.on("ERROR", onError);
            this.emit("open");
        };

        this.socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === "EVENT") {
                    this.emit("event", data);
                    if (data.payload?.eventType) {
                        this.emit(data.payload.eventType, data.payload);
                    }
                } else if (data.type === "COMMAND") {
                    this.emit("command", data);
                } else {
                    this.emit("message", data);
                }
            } catch (err) {
                console.error("Error parseando JSON:", err);
                onError({message: "Error interpretando datos del backend."})
            }
        };

        this.socket.onclose = () => {
            console.log("⚠️ Conexión cerrada");
            this.emit("close");
            this.socket = null;

            if (this.shouldReconnect) {
                console.log("🔄 Reintentando conexión en 2s...");
                setTimeout(() => this.connect(this.url), 2000);
            }
        };

        this.socket.onerror = (err) => {
            this.emit("error", err);
        };
    }

    disconnect() {
        wsClient.off("ERROR");
        this.shouldReconnect = false;
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    sendCommand(label) {
        this._send({
            id: crypto.randomUUID().toString(),
            type: "COMMAND",
            label
        });
    }

    sendEvent(eventType, payload = {}) {
        this._send({
            id: crypto.randomUUID().toString(),
            type: "EVENT",
            payload: {
                eventType,
                ...payload
            }
        });
    }

    sendLogResponse(requestId, logMessage) {
        this.sendEvent("RESPONSE", { id: requestId, message: logMessage });
    }

    _send(json) {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(json));
        } else {
            console.warn("⚠️ Socket no está abierto");
        }
    }

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }

    emit(event, data) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(cb => cb(data));
    }
}

const wsClient = new WSClient();
export default wsClient;