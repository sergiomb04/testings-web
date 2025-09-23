import fetch from 'node-fetch';

export async function POST(req) {
    const { text } = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/text/set`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });

    if (!res.ok) return new Response('Error al guardar', { status: 500 });

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
}