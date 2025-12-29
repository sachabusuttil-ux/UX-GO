"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const isHovered = useRef(false);
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Safe check for touch devices - disable custom cursor
        if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });

        const xToFollower = gsap.quickTo(followerRef.current, "x", { duration: 0.3, ease: "power3" });
        const yToFollower = gsap.quickTo(followerRef.current, "y", { duration: 0.3, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
            xToFollower(e.clientX);
            yToFollower(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Theme Detection
            const themeEl = target.closest("[data-theme]");
            if (themeEl) {
                const theme = themeEl.getAttribute("data-theme");
                setIsDark(theme === "dark");
            }

            // Check if hovering interactive element
            // Check if hovering interactive element
            if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest(".group")) {
                if (!isHovered.current) {
                    isHovered.current = true;
                    // Animate follower expand
                    gsap.to(followerRef.current, {
                        width: 80,
                        height: 80,
                        backgroundColor: "#ffffff",
                        mixBlendMode: "difference",
                        border: "none",
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    // Hide the small dot or blend it
                    gsap.to(cursorRef.current, {
                        opacity: 0,
                        duration: 0.3
                    });
                }
            } else {
                if (isHovered.current) {
                    isHovered.current = false;
                    // Animate follower shrink back to default
                    gsap.to(followerRef.current, {
                        width: 40,
                        height: 40,
                        backgroundColor: "transparent",
                        border: isDark ? "1px solid rgba(255, 255, 255, 0.3)" : "1px solid rgba(0, 0, 0, 0.3)",
                        mixBlendMode: "normal",
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    // Show small dot
                    gsap.to(cursorRef.current, {
                        opacity: 1,
                        duration: 0.3
                    });
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                aria-hidden="true"
                className={cn(
                    "fixed top-0 left-0 w-3 h-3 border rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300",
                    isDark ? "bg-white border-white" : "bg-black border-black"
                )}
            />
            <div
                ref={followerRef}
                aria-hidden="true"
                className={cn(
                    "fixed top-0 left-0 w-10 h-10 border rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300",
                    isDark ? "border-white/30" : "border-black/30"
                )}
            />
        </>
    );
}
