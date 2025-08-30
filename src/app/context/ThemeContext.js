'use client'

import {createContext, useEffect, useState} from "react";

export const ThemeContext = createContext();

export function ThemeProvider({children}) {

    const [darkMode, setDarkMode] = useState(null);

    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
    }, []);

    useEffect(() => {
        if (darkMode === null) return;
        if (darkMode) {
            document.documentElement.style.setProperty('--background', '#0a0a0a');
            document.documentElement.style.setProperty('--foreground', '#ededed');
        } else {
            document.documentElement.style.setProperty('--background', '#ffffff');
            document.documentElement.style.setProperty('--foreground', '#171717');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <div>
            <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
                {children}
            </ThemeContext.Provider>
        </div>
    )
}