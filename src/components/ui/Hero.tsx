"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const uxgoRef = useRef<HTMLDivElement>(null);
    const studioRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // UX&GO Text Entry
            const uxgoChars = uxgoRef.current?.querySelectorAll(".char");
            if (uxgoChars) {
                gsap.fromTo(uxgoChars,
                    { y: 200, opacity: 0, scale: 0.5 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1.2,
                        stagger: 0.05,
                        ease: "power3.out"
                    }
                );
            }

            // STUDIO Typewriter Loop
            const studioChars = studioRef.current?.querySelectorAll(".char");
            if (studioChars) {
                // Set initial state: collapsed so cursor starts at left
                gsap.set(studioChars, { opacity: 0, width: 0, display: "none" });

                const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

                // Typing (Reveal + Expand)
                tl.to(studioChars, {
                    display: "inline-block",
                    width: "auto",
                    opacity: 1,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: "power2.out"
                })
                    // Erasing (Hide + Collapse from END)
                    .to(studioChars, {
                        width: 0,
                        opacity: 0,
                        margin: 0,
                        padding: 0,
                        duration: 0, // Instant disappear for "jerky" effect
                        stagger: {
                            each: 0.1,
                            from: "end"
                        },
                        delay: 20,
                        ease: "steps(1)" // Ensure no interpolation
                    });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#5E14DF] flex items-center justify-center">
            {/* Noise Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none z-10"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />



            {/* Glass Frosted Text Container */}
            <div className="relative z-30 w-full px-4 text-center flex flex-col items-center">
                {/* Icon */}


                <h1
                    aria-label="UX ET GO STUDIO"
                    className="relative flex flex-col items-center justify-center text-[12vw] md:text-[11vw] leading-[0.85] font-display font-black uppercase tracking-tighter w-full text-white"
                >
                    <div ref={uxgoRef} aria-hidden="true" className="overflow-hidden px-4"><span className="char inline-block">U</span><span className="char inline-block">X</span><span className="char inline-block text-[#0D0123]">&</span><span className="char inline-block">G</span><span className="char inline-block">O</span></div>

                    {/* Hollow 'STUDIO' with Glass Fill appearance */}
                    <div ref={studioRef} aria-hidden="true" className="group overflow-hidden relative mt-2 tracking-normal bg-[#4B11B3] border border-white/10 backdrop-blur-sm shadow-[0_4px_24px_rgba(216,180,254,0.1)] rounded-xl px-8 py-4 -rotate-2 transform transition-all duration-500 md:hover:rotate-0 md:hover:scale-105 md:hover:bg-white cursor-none">
                        <span className="char inline-block text-white transition-colors duration-300 md:group-hover:text-[#5E14DF]">S</span>
                        <span className="char inline-block text-white transition-colors duration-300 md:group-hover:text-[#5E14DF]">T</span>
                        <span className="char inline-block text-white transition-colors duration-300 md:group-hover:text-[#5E14DF]">U</span>
                        <span className="char inline-block text-white transition-colors duration-300 md:group-hover:text-[#5E14DF]">D</span>
                        <span className="char inline-block text-white transition-colors duration-300 md:group-hover:text-[#5E14DF]">I</span>
                        <span className="char inline-block text-white transition-colors duration-300 md:group-hover:text-[#5E14DF]">O</span>
                        {/* Blinking Cursor */}
                        <span className="inline-block w-[3px] h-[0.7em] ml-1 align-baseline bg-white animate-blink"></span>
                    </div>
                </h1>

                <div className="mt-12 inline-block">
                    <p className="flex items-center justify-center gap-6 text-sm md:text-xl font-sans font-medium tracking-[0.5em] uppercase text-white/80">
                        <span>Expérience Digitale</span>
                        <span className="text-white animate-pulse text-3xl leading-none pt-1">•</span>
                        <span>No-Code</span>
                    </p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 right-10 text-xs font-sans tracking-widest uppercase opacity-40 animate-pulse z-30 text-white">
                SCROLLEZ POUR EXPLORER
            </div>

            {/* Bottom Gradient Fade - Adjusted for Purple Bg */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-20" />
        </section>
    );
}
