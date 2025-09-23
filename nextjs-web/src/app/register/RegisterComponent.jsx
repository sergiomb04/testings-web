'use client'

import {useState} from "react";
import {toast} from "react-hot-toast";
import PanelButton from "@/app/components/button/PanelButton";
import {useRouter} from "next/navigation";
import {useUser} from "@/app/context/UserContext";

export default function RegisterComponent() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {refreshUser} = useUser();

    const handleRegister = async () => {
        if (!username.trim() || username.length < 6) {
            setError("Introduce nombre de usuario! (Min. 6 caracteres)");
            return;
        }

        if (!password.trim() || password.length < 6) {
            setError("Introduce contraseña! (Min. 6 caracteres)");
            return;
        }

        setError("");
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
                credentials: 'include'
            });

            if (!res.ok) {
                const data = await res.json();
                const message = data?.message || 'Error desconocido';
                toast.error(`No se ha podido registrar. ${message}`);
                return;
            }

            const data = await res.json();
            localStorage.setItem("token", data.token);
            document.cookie = `token=${data.token}; path=/;`;

            toast.success("Registro completado.");
            await refreshUser();
            router.push('/')
        } catch (error) {
            toast.error("Error de conexión.");
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center h-[calc(100vh-100px)]">
            <div className="flex flex-col w-max bg-neutral-700 rounded-xl m-auto p-4 gap-8">
                <h1 className="text-2xl text-center font-semibold">Registrate</h1>

                <div className="grid gap-1">
                    <label>Nombre de usuario</label>
                    <input
                        className="bg-neutral-900 p-2 rounded-sm border-stone-600 border-1 focus:outline-none"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label>Contraseña</label>
                    <input
                        className="bg-neutral-900 p-2 rounded-sm border-stone-600 border-1 focus:outline-none"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && <p className="text-red-400">{error}</p>}

                <PanelButton
                    style="text-center"
                    onClick={handleRegister}
                >
                    Registrate
                </PanelButton>

                <div className="flex gap-2">
                    <p>Ya estás registrado?</p>
                    <a className="text-blue-400" href="/login">Iniciar sesión</a>
                </div>
            </div>
        </div>
    )
}