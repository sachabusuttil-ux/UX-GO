"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";

const navItems = [
    { label: "Manifesto", target: "#manifesto" },
    { label: "Cible", target: "#for-who" },
    { label: "Services", target: "#services" },
    { label: "Projets", target: "#projects" },
    { label: "Contact", target: "#contact" },
];

export default function Navbar() {
    const navRef = useRef<HTMLDivElement>(null);
    const [isDarkTheme, setIsDarkTheme] = useState(true); // Default to dark (White text)

    const lenis = useLenis(({ scroll }: { scroll: number }) => {
        // Detect theme under the navbar center
        if (typeof window !== "undefined") {
            const navRect = navRef.current?.getBoundingClientRect();
            if (navRect) {
                const centerX = navRect.left + navRect.width / 2;
                const centerY = navRect.top + navRect.height / 2;

                // Find element at the center of the navbar, piercing through the navbar itself
                const elements = document.elementsFromPoint(centerX, centerY);
                const themeElement = elements.find(el => el.closest("[data-theme]"))?.closest("[data-theme]");
                const theme = themeElement?.getAttribute("data-theme");

                const isLight = theme === "light";
                setIsDarkTheme(!isLight);
            }
        }
    });

    const scrollToSection = (e: React.MouseEvent, target: string) => {
        e.preventDefault();
        if (lenis) {
            lenis.scrollTo(target, { duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
            document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        // Floating animation
        gsap.to(navRef.current, {
            y: 15,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, []);

    return (
        <div className="hidden md:block fixed bottom-8 left-1/2 -translate-x-1/2 z-[90]">
            <nav
                ref={navRef}
                className={cn(
                    "flex items-center gap-1 px-2 py-2 rounded-full border backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-colors duration-500",
                    isDarkTheme
                        ? "border-white/10 bg-white/5"
                        : "border-black/10 bg-black/5"
                )}
            >
                {navItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.target}
                        onClick={(e) => scrollToSection(e, item.target)}
                        className={cn(
                            "relative px-4 py-2 rounded-full text-xs font-sans uppercase tracking-widest transition-all duration-300 group overflow-hidden",
                            isDarkTheme
                                ? "text-white/70 md:hover:text-white md:hover:bg-white/10"
                                : "text-black/70 md:hover:text-black md:hover:bg-black/10"
                        )}
                    >
                        <span className="relative z-10">{item.label}</span>
                        {/* Hover Liquid Effect - Adapted for theme */}
                        <span className={cn(
                            "absolute inset-0 blur-lg rounded-full opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 transform scale-150",
                            isDarkTheme ? "bg-black/50" : "bg-white/50" // Dark theme has black hover (requested), Light theme -> White hover? Or Black? User said "retire violet ... mets noir". Assuming black hover is desired style for Dark theme. For Light theme, maybe white glow? Or keep black? Let's try White glow for contrast on light bg.
                        )} />
                    </a>
                ))}
            </nav>
        </div>
    );
}
