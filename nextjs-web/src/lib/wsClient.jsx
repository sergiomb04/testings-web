import {toast} from "react-hot-toast";

const onError = (payload) => toast.error(payload.message);

class WSClient {

    constructor() {
        this.socket = null;
        this.listeners = {};
        this.url = null;
    }

    connect(url, retry = true) {
        if (this.socket) return;

        this.url = url;
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log("✅ Conectado al WebSocket");
            wsClient.on("ERROR", onError);
            this.emit("open");
            this.reconnectAttempts = 0;
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

            if (retry && (this.reconnectAttempts ?? 0) < 5) {
                this.reconnectAttempts = (this.reconnectAttempts ?? 0) + 1;
                const delay = 1000 * this.reconnectAttempts;
                console.log(`🔁 Reintentando conectar en ${delay}ms...`);
                setTimeout(() => this.connect(url, retry), delay);
            }
        };

        this.socket.onerror = (err) => {
            this.emit("error", err);
        };
    }

    disconnect() {
        wsClient.off("ERROR");
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    sendCommand(label) {
        this._send({
            id: generateUUID(),
            type: "COMMAND",
            label
        });
    }

    sendEvent(eventType, payload = {}) {
        this._send({
            id: generateUUID(),
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
            onError({message: "No estás conectado."})
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
        if (callback) {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        } else {
            delete this.listeners[event];
        }
    }

    emit(event, data) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(cb => cb(data));
    }
}

function generateUUID() {
    if (crypto?.randomUUID) return crypto.randomUUID();
    // fallback simple tipo UUID
    return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const wsClient = new WSClient();
export default wsClient;