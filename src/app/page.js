'use client'

import IconToggle from "@/app/components/IconToggle";
import {FaMoon, FaSun} from "react-icons/fa";
import {ThemeContext, ThemeProvider} from "@/app/context/ThemeContext";
import {useContext} from "react";

function HomeContent() {
    const {darkMode, toggleDarkMode} = useContext(ThemeContext);

    return (
        <main>
            <h1 className="text-4xl">Test</h1>
            {darkMode !== null && (
                <IconToggle
                    enabled={darkMode}
                    enabledIcon={<FaMoon/>}
                    disabledIcon={<FaSun/>}
                    onClick={toggleDarkMode}
                />
            )}
        </main>
    );
}


export default function Home() {
    return (
        <ThemeProvider>
            <HomeContent/>
        </ThemeProvider>
    );
}
