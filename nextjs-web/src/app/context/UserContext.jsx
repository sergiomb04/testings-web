"use client"
import {createContext, useContext, useEffect, useState} from "react";

const UserContext = createContext(null);

export function UserProvider({children, initialUser}) {
    const [user, setUser] = useState(initialUser)

    useEffect(() => {

        fetch('http://localhost:8080/api/user', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setUser(data);
                } else {
                    setUser(null); // no hay token
                }
            })
            .catch(() => {
                setUser(null);
            });
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext);
}