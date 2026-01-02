"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

export default function Manifesto() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);

    // Segmented layout for precise styling and line-breaking
    const segments = [
        { text: "Votre produit", highlight: true },
        { text: " mérite une expérience ", highlight: false },
        { text: "sur-mesure,", highlight: true },
        { text: " pensée pour ", highlight: false },
        { text: "vos utilisateurs.", highlight: true },
    ];

    const paragraph = "Institutions, Startups, PME, ou Freelances, nous nous adaptons à vos enjeux. Que vous partiez de zéro ou que vous ayez besoin d’optimiser l’existant, nous vous aidons à (re)penser votre site avec méthode, clarté et efficacité.";

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Headline Animation
            gsap.fromTo(".anim-segment",
                { opacity: 0.1, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        end: "bottom 60%",
                        scrub: 1,
                    }
                }
            );

            // Paragraph Animation
            gsap.fromTo(paraRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen w-full bg-[#111111] flex flex-col items-center justify-center p-8 md:p-20">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                <span className="block text-primary-gradient text-sm tracking-[0.3em] font-sans font-bold uppercase mb-10 text-center">Manifesto</span>

                {/* Max-width constrained to force approx 3 lines on desktop */}
                <h2
                    ref={textRef}
                    aria-label="Votre produit mérite une expérience sur-mesure, pensée pour vos utilisateurs."
                    className="text-[8vw] md:text-[5vw] leading-[1.3] font-display font-medium text-foreground text-center text-balance mb-12 max-w-5xl"
                >
                    {segments.map((seg, i) => (
                        <span
                            key={i}
                            aria-hidden="true"
                            className="anim-segment inline-block mx-[0.15em] perspective-1000" // Outer wrapper for GSAP
                        >
                            <span className={cn(
                                "inline-block rounded-xl transition-all duration-300 origin-center backface-hidden",
                                seg.highlight
                                    ? "bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-1 text-primary-gradient font-bold shadow-[0_4px_24px_rgba(133,85,231,0.15)] cursor-pointer hover:scale-110 hover:-rotate-2 hover:bg-primary-gradient hover:text-white group transition-all duration-500 ease-out"
                                    : "text-foreground"
                            )}>
                                {seg.text.trim()}
                            </span>
                        </span>
                    ))}
                </h2>

                <p ref={paraRef} className="text-xl md:text-2xl font-sans text-accent-2 max-w-3xl leading-relaxed text-center">
                    {paragraph}
                </p>
            </div>
        </section>
    );
}
