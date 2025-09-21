"use client";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children, initialUser }) {
    const [user, setUser] = useState(initialUser);
    const [token, setToken] = useState(null);

    useEffect(() => {
        let t;
        if (typeof localStorage !== 'undefined') {
            t = localStorage.getItem("token");
        } else if (typeof document !== 'undefined') {
            t = document.cookie
                .split('; ')
                .find(row => row.startsWith('token='))
                ?.split('=')[1];
        }
        setToken(t);
    }, []);

    const refreshUser = async () => {
        if (!token) return; // evitar llamar sin token
        try {
            const res = await fetch(`http://192.168.0.12:8080/api/user`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                cache: "no-store"
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        }
    };

    useEffect(() => {
        refreshUser();
    }, [token]);

    return (
        <UserContext.Provider value={{ user, setUser, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
}


export function useUser() {
    return useContext(UserContext);
}
