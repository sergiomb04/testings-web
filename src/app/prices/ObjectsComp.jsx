export default async function ObjectsComponent() {
    const res = await fetch("https://api.restful-api.dev/objects");
    const data = await res.json();
    return <div>{data.message}</div>;
}