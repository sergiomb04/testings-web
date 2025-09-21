'use client'

import {toast} from "react-hot-toast";
import PanelButton from "@/app/components/button/PanelButton";
import {useUser} from "@/app/context/UserContext";
import {useState} from "react";
import {router} from "next/client";

export default function ChangePassword() {
    const {user} = useUser();

    console.log('DEBUG USER:', user)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')


    const changePassword = async (oldPassword, password) => {
        try {
            const res = await fetch('http://192.168.0.12:8080/api/auth/change-password', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username:user.username, oldPassword, newPassword})
            });

            if (!res.ok) {
                toast.error("No se ha podido cambiar la contraseña.");
                return;
            }

            const data = await res.json();
            localStorage.setItem("token", data.token);
            document.cookie = `token=${data.token}; path=/;`;

            toast.success("Contraseña cambiada correctamente!");
        } catch (error) {
            toast.error("Error de conexión.");
            console.error(error);
        }
    };

    return (
        <div>
            <h3>Cambiar contraseña</h3>

            <div className={`grid gap-1`}>
                <label>Contraseña antigua</label>
                <input
                    className={`bg-neutral-900 p-2 rounded-sm border-stone-600 border-1 focus:outline-none`}
                    type="password"
                    onChange={(e) => setOldPassword(e.target.value)}/>

                <label>Nueva contraseña</label>
                <input
                    className={`bg-neutral-900 p-2 rounded-sm border-stone-600 border-1 focus:outline-none`}
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}/>
            </div>

            <PanelButton
                style={`text-center`}
                onClick={() => {
                    changePassword(oldPassword)
                }}>Iniciar sesión</PanelButton>
        </div>
    )
}