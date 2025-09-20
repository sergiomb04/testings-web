import {cookies} from "next/headers";
import {getValid} from "@/lib/AuthController";

async function getUserData() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";
    if (!token) return null;
    const valid = await getValid(token);
    if (!valid) return null;

    const res = await fetch("http://localhost:8080/api/user/admin", {
        method: "GET",
        headers: {
            Cookie: `token=${token}`,
        },
        cache: "no-store"
    });

    if (!res.ok) return null;
    const user = await res.json();
    // filtra lo que NO quieres exponer
    return { id: user._id, username: user.username, role: user.role, text: user?.text };
}

export default async function UserTextComponent() {
    const userData = await getUserData();
    if (!userData) return null;

    const text = userData?.text;

    return (text ?
            <h1>TEXTO OPCIONAL USUARIO: {text}</h1> : null
    )
}