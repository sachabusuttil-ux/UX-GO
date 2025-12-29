"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
    { id: "01", title: "UX/UI Design", desc: "Création d'interfaces intuitives et immersives." },
    { id: "02", title: "DA & Identité Visuelle", desc: "Direction artistique 360 à votre image." },
    { id: "03", title: "Motion & 3D", desc: "Storytelling interactif et immersif." },
    { id: "04", title: "Développement No-Code", desc: "Déploiement rapide avec outils sur mesure." }
];

export default function Services() {
    const [active, setActive] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(itemsRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full py-20 px-4 md:px-20 bg-[#111111] text-foreground z-10 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <span className="block text-accent-2 text-sm tracking-[0.3em] font-sans font-bold uppercase mb-4">Notre Expertise</span>
                    <h2 className="text-6xl md:text-8xl font-display font-bold uppercase text-white">Services</h2>
                </div>

                <div className="flex flex-col border-t border-white/20">
                    {services.map((item, index) => (
                        <div
                            key={item.id}
                            ref={(el) => { itemsRef.current[index] = el }}
                            onMouseEnter={() => setActive(index)}
                            onMouseLeave={() => setActive(null)}
                            onFocus={() => setActive(index)}
                            onBlur={() => setActive(null)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setActive(active === index ? null : index);
                                }
                            }}
                            tabIndex={0}
                            role="button"
                            aria-expanded={active === index}
                            className="group relative border-b border-white/20 py-16 cursor-pointer overflow-hidden transition-all duration-500 hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                        >
                            <div className="flex flex-col md:flex-row md:items-center relative z-10 pointer-events-none md:gap-24">
                                <span className="text-xl font-sans text-accent-2 mb-4 md:mb-0">({item.id})</span>

                                {/* Description - Visible on mobile/focus/hover, placed above title on mobile */}
                                <p className={cn(
                                    "text-lg font-sans text-gray-400 mb-4 md:mb-0 max-w-sm transition-opacity duration-300 md:mx-auto md:pr-24 order-2 md:order-3",
                                    active === index ? "opacity-100" : "opacity-100 md:opacity-0"
                                )}>
                                    {item.desc}
                                </p>

                                <h3 className={cn(
                                    "text-4xl md:text-7xl font-display font-semibold uppercase transition-all duration-300 order-3 md:order-2",
                                    active === index ? "text-primary translate-x-4" : "text-foreground"
                                )}>
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
