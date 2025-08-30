"use client";
import {usePathname} from "next/navigation";
import {LayoutGroup, motion} from "framer-motion";
import Link from "next/link";
import {useState} from "react";

const links = [
    {href: "/", title: "Home"},
    {href: "/work", title: "Work"},
    {href: "/awards", title: "Awards"},
    {href: "/team", title: "Team"},
    {href: "/prices", title: "Prices"},
    {href: "/contact", title: "Contact"},
];

export default function NavbarComponent() {
    const pathname = usePathname();
    const [hovered, setHovered] = useState(null);

    return (
        <div className="flex justify-center">
            <LayoutGroup id="navbar">
                <ul
                    className="flex gap-2 overflow-x-auto no-scrollbar p-1.5 bg-[#949494] rounded-full"
                    onMouseLeave={() => setHovered(null)}
                >
                    {links.map((link) => (
                        <NavbarLinkComponent
                            key={link.href}
                            href={link.href}
                            title={link.title}
                            active={pathname === link.href}
                            hovered={hovered === link.href}
                            onEnter={() => setHovered(link.href)}
                        />
                    ))}
                </ul>
            </LayoutGroup>
        </div>
    );
}

function NavbarLinkComponent({href, title, active, hovered, onEnter}) {
    return (
        <li
            className="relative text-[#202020] text-xl rounded-full px-4 py-2"
            onMouseEnter={onEnter}
        >
            {/* selected */}
            {active && (
                <motion.span
                    layoutId="active-link"
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.2, ease: "easeOut"}}
                    className="absolute inset-0 bg-[#1A1A1A] rounded-full"
                />
            )}

            {/* hover flotante */}
            {hovered && !active && (
                <motion.span
                    layoutId="hover-link"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{type: "spring", stiffness: 600, damping: 40, mass: 0.35, duration: 0.5}}
                    className="absolute inset-0 bg-[#DDDEE2] rounded-full pointer-events-none"
                />
            )}

            <Link href={href} className="relative z-10 w-full h-full flex items-center justify-center" draggable={false}>
                <motion.span
                    animate={{color: active ? "#FFFFFF" : "#202020"}}
                    transition={{duration: 0.2}}
                >
                    {title}
                </motion.span>
            </Link>
        </li>
    );
}
