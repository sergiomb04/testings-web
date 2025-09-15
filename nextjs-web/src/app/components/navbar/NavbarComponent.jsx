"use client";
import {usePathname, useRouter} from "next/navigation";
import {LayoutGroup, motion} from "framer-motion";
import Link from "next/link";
import {useEffect, useState} from "react";
import NavLogoComp from "@/app/components/navbar/NavLogoComp";
import {useUser} from "@/app/context/UserContext";

const links = [
    {href: "/", title: "Home"},
    {href: "/testing", title: "Testing"},
    {href: "/work", title: "Work"},
    {href: "/awards", title: "Awards"},
    {href: "/team", title: "Team"},
    {href: "/items", title: "Items"},
    {href: "/contact", title: "Contact"},
];

export default function NavbarComponent() {
    const router = useRouter();
    const pathname = usePathname();
    const [hovered, setHovered] = useState(null);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const {user} = useUser();
    const [userNavComp, setUserNavComp] = useState(null);

    useEffect(() => {
        setMobileNavOpen(false);
    }, [pathname]);

    useEffect(() => {
        setUserNavComp(user ?
            <p>{user.username}</p>
            :
            <button className={"bg-blue-400 p-4 rounded-2xl cursor-pointer"}
                    onClick={() => router.push('/login')}>
                Login
            </button>
        )
    }, [user])

    return (
        <div className="flex items-center justify-between min-md:gap-12 w-full p-2">
            <NavLogoComp/>

            {/* Links desktop */}
            <LayoutGroup id="navbar">
                <ul
                    className="hidden md:flex gap-2 p-1.5 bg-[#949494] rounded-full"
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

                {/* USER LOGIN / INFO */}
                {userNavComp}
            </LayoutGroup>

            {/* Botón hamburguesa mobile */}
            <button className="md:hidden p-2" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {/* Menú mobile desplegable */}
            {mobileNavOpen && (
                <div
                    className="absolute top-16 right-4 bg-white shadow-lg rounded-xl p-4 flex flex-col gap-2 md:hidden z-50">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="block px-4 py-2 text-[#202020] hover:bg-gray-200 rounded font-sans"
                            draggable={false}
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
            )}
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
                    transition={{
                        type: "spring",
                        stiffness: 600,
                        damping: 40,
                        mass: 0.35,
                        duration: 0.5,
                    }}
                    className="absolute inset-0 bg-[#DDDEE2] rounded-full pointer-events-none"
                />
            )}

            <Link
                href={href}
                className="relative z-10 w-full h-full flex items-center justify-center"
                draggable={false}
            >
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
