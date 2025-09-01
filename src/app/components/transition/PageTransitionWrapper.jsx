"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransitionWrapper({ children }) {
    const pathname = usePathname();

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%", height: "100%" }}
            onAnimationStart={() => console.log("Animación start")}
            onAnimationComplete={() => console.log("Animación complete")}
        >
            {children}
        </motion.div>
    );
}
