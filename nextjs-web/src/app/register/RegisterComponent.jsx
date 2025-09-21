'use client'

import {useState} from "react";
import {toast} from "react-hot-toast";
import PanelButton from "@/app/components/button/PanelButton";
import {useRouter} from "next/navigation";
import {useUser} from "@/app/context/UserContext";

export default function RegisterComponent() {
    const router = useRouter();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {refreshUser} = useUser();

    const register = async (username, password) => {
        try {
            const res = await fetch('http://192.168.0.12:8080/api/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
                credentials: 'include'
            });

            if (!res.ok) {
                toast.error("No se ha podido registrar.");
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
        <div className={`flex justify-center items-center h-[calc(100vh-100px)]`}>
            <div className={`flex flex-col w-max bg-neutral-700 rounded-xl m-auto p-4 gap-8`}>
                <h1 className={`text-2xl text-center font-semibold`}>Registrate</h1>

                <div className={`grid gap-1`}>
                    <label>Nombre de usuario</label>
                    <input
                        className={`bg-neutral-900 p-2 rounded-sm border-stone-600 border-1 focus:outline-none`}
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}/>

                    <label>Contraseña</label>
                    <input
                        className={`bg-neutral-900 p-2 rounded-sm border-stone-600 border-1 focus:outline-none`}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <PanelButton
                    style={`text-center`}
                    onClick={() => {
                        register(username, password)
                    }}>Registrate
                </PanelButton>
                <div className='flex gap-2'>
                    <p>Ya estás registrado? </p><a
                    className='text-blue-400'
                    href='/login'>Iniciar sesión</a>
                </div>
            </div>
        </div>
    )
}