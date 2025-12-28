"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    { id: 1, title: "Neon Pulse", category: "Web Design", aspect: "aspect-[4/3]", color: "from-purple-500 to-indigo-900" },
    { id: 2, title: "Quantum Leaps", category: "Branding", aspect: "aspect-[3/4]", color: "from-blue-500 to-cyan-900" },
    { id: 3, title: "Velvet Void", category: "Motion", aspect: "aspect-square", color: "from-red-500 to-orange-900" },
    { id: 4, title: "Cyber Nature", category: "3D Art", aspect: "aspect-[3/5]", color: "from-emerald-500 to-teal-900" },
    { id: 5, title: "Urban Echo", category: "Photography", aspect: "aspect-[16/9]", color: "from-gray-500 to-slate-900" },
    { id: 6, title: "Liquid Dreams", category: "Interactive", aspect: "aspect-[4/5]", color: "from-pink-500 to-rose-900" },
];

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(itemsRef.current,
                { opacity: 0, y: 100 },
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
        <section ref={containerRef} className="w-full py-20 px-4 md:px-20 bg-background text-foreground">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <span className="block text-accent-2 text-sm tracking-[0.3em] font-sans font-bold uppercase mb-4">Sélection de Projets</span>
                    <h2 className="text-6xl md:text-8xl font-display font-bold uppercase text-white">Showroom</h2>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {projects.map((project, i) => (
                        <div
                            key={project.id}
                            ref={(el) => { itemsRef.current[i] = el }}
                            className={cn("group relative bg-secondary/50 overflow-hidden border border-white/10 break-inside-avoid rounded-xl", project.aspect)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20 opacity-100 flex flex-col justify-end p-8">
                                <span className="text-primary text-sm uppercase tracking-widest mb-2 font-bold">{project.category}</span>
                                <h3 className="text-2xl md:text-3xl font-display font-bold uppercase">{project.title}</h3>
                            </div>

                            {/* Placeholder Gradient Content */}
                            <div className={cn("absolute inset-0 bg-gradient-to-br", project.color)} />

                            {/* Static Overlay */}
                            <div className="absolute inset-0 bg-black/10" />
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
}
