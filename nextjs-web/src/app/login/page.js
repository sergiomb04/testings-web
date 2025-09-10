import LoginComponent from "@/app/login/LoginComponent";
import {cookies} from "next/headers";

export default async function LoginPage() {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";
    const valid = await getValid(token);

    return !valid ? (
            <LoginComponent/>)
        : (
            <div>
                <h1>Ya has iniciado sesión!!!</h1>
            </div>
        );
}

async function getValid(token) {
    const res = await fetch("http://localhost:8080/api/auth/verify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store", // importante para que siempre valide en cada request
    });

    if (!res.ok) return false;
    const data = await res.json();
    return data.valid;
}