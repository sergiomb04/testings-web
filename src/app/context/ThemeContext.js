'use client';

import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(null);

    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
    }, []);

    useEffect(() => {
        if (darkMode === null) return;

        if(darkMode) {
            document.documentElement.style.setProperty('--background', '#1A1A1A');
            document.documentElement.style.setProperty('--foreground', '#DDDEE2');
        } else {
            document.documentElement.style.setProperty('--background', '#FFFFFF');
            document.documentElement.style.setProperty('--foreground', '#202020');
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}
