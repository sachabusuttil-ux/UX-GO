"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    { id: 1, title: "Nutri AI", category: "DA & Identité Visuelle", aspect: "aspect-[4/3]", image: "/projects/nutri-ai-logo.jpg" },
    { id: 2, title: "Nutri AI", category: "UX/UI Design", aspect: "aspect-[9/16]", image: "/projects/nutri-ai-app.jpg" },
    { id: 3, title: "Next2You", category: "DA & Identité Visuelle", aspect: "aspect-square", image: "/projects/next2you-web.jpg" },
    { id: 4, title: "Next2You", category: "UX/UI Design", aspect: "aspect-[3/5]", image: "/projects/cookie-logo.jpg" },
    { id: 5, title: "Un Cookie d'Amour", category: "DA & Identité Visuelle", aspect: "aspect-square", image: "/projects/next2you-logo.jpg" },
    { id: 6, title: "L3C", category: "UX/UI Design", aspect: "aspect-[2/3]", image: "/projects/l3c-web.jpg" },
];

export default function Projects() {
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
                                <span className="text-white text-sm uppercase tracking-widest mb-2 font-bold">{project.category}</span>
                                <h3 className="text-2xl md:text-3xl font-display font-bold uppercase">{project.title}</h3>
                            </div>

                            {/* Project Image */}
                            {project.image ? (
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        priority={i < 3}
                                        className="object-cover transition-transform duration-700 md:group-hover:scale-105"
                                    />
                                </div>
                            ) : (
                                <div className="absolute inset-0 bg-neutral-900 z-0" />
                            )}

                            {/* Static Overlay */}
                            <div className="absolute inset-0 bg-black/10 z-10" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
