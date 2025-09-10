'use client'

import PanelButton from "@/app/components/button/PanelButton";
import {useState} from "react";

async function sendText(newText) {
    const res = await fetch('/api/text/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText })
    });

    if (!res.ok) alert('Error al enviar');
    else alert('Texto enviado');
}

export default function SetTextComponent() {
    const [text, setText] = useState('')

    return (
        <div>
            <input value={text} onChange={e => setText(e.target.value)} placeholder="Escribe algo"/>
            <PanelButton onClick={() => sendText(text)}>Enviar</PanelButton>
        </div>
    )
}
