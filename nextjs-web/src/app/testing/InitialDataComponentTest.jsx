import SetTextComponent from "@/app/testing/SetTextComponent";

async function getText() {
    const res = await fetch('http://192.168.0.12:8080/api/text/get', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch text');
    return res.json();
}

export default async function InitialDataComponentTest() {
    const data = await getText();

    return (
        <div>
            <p>{data.text || 'No hay texto'}</p>
            <SetTextComponent/>
        </div>
    )
}