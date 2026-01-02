"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const clients = [
    {
        id: "01",
        title: "Startups",
        desc: "Lancement de produit, MVP, et identité forte pour convaincre investisseurs et premiers utilisateurs."
    },
    {
        id: "02",
        title: "PME & ETI",
        desc: "Digitalisation de services, refonte de site vitrine, et modernisation de l'image de marque."
    },
    {
        id: "03",
        title: "Institutions",
        desc: "Accessibilité, clarté de l'information, et plateformes robustes pour le grand public."
    },
    {
        id: "04",
        title: "Freelances",
        desc: "Personal branding et portfolio impactant pour se démarquer sur un marché saturé."
    }
];

export default function ForWho() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(cardsRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        end: "bottom 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full py-20 px-4 md:px-20 bg-background text-foreground z-10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <span className="block text-accent-2 text-sm tracking-[0.3em] font-sans font-bold uppercase mb-4">Cible</span>
                    <h2 className="text-6xl md:text-8xl font-display font-bold uppercase text-white">Pour Qui ?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {clients.map((client, index) => (
                        <div
                            key={client.id}
                            ref={el => { cardsRef.current[index] = el }}
                            className="group relative border border-white/10 bg-white/5 p-8 md:p-12 hover:bg-white/10 transition-colors duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-50 font-sans text-sm tracking-widest">{client.id}</div>

                            <h3 className="text-3xl md:text-4xl font-display font-bold uppercase mb-6 text-primary-gradient group-hover:text-white transition-colors duration-300">
                                {client.title}
                            </h3>
                            <p className="text-lg font-sans text-accent-2 leading-relaxed">
                                {client.desc}
                            </p>

                            {/* Hover Effect Line */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary-gradient transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
