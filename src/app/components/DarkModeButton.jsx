'use client'

import IconToggle from "@/app/components/IconToggle";
import {FaMoon, FaSun} from "react-icons/fa";
import {useContext} from "react";
import {ThemeContext} from "@/app/context/ThemeContext";

export default function DarkModeButton() {
    const {darkMode, toggleDarkMode} = useContext(ThemeContext);
    return (
        <>
            {darkMode !== null && (
                <IconToggle
                    enabled={darkMode}
                    enabledIcon={<FaMoon/>}
                    disabledIcon={<FaSun/>}
                    onClick={toggleDarkMode}
                />
            )}
        </>
    )
}