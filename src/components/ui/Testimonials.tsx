"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        id: 1,
        quote: "L'équipe UX&GO a totalement transformé notre approche produit. Le design est non seulement magnifique, mais il convertit.",
        author: "Charly B.",
        role: "Next2You",
        image: "/avatar1.jpg"
    },
    {
        id: 2,
        quote: "Une rapidité d'exécution incroyable grâce au No-Code. Nous avons lancé notre MVP en 3 semaines au lieu de 3 mois.",
        author: "Ines M.",
        role: "Cookie D'amour",
        image: "/avatar2.jpg"
    },
    {
        id: 3,
        quote: "L'expertise 'Glassmorphism' qu'ils apportent est unique. Notre plateforme n'a jamais été aussi moderne et fluide.",
        author: "Nassir E.",
        role: "Nutri AI",
        image: "/avatar3.jpg"
    }
];

export default function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Cards Stagger Animation
            gsap.fromTo(cardsRef.current,
                { opacity: 0, y: 100, rotation: 5 },
                {
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    duration: 1,
                    stagger: 0.2,
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

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
    };

    return (
        <section ref={containerRef} className="relative w-full py-24 px-4 md:px-20 bg-primary-gradient text-foreground overflow-hidden">
            {/* Background Gradient/Glow for depth */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-20 text-center relative z-10">
                    <span className="block text-white/70 text-sm tracking-[0.3em] font-sans font-bold uppercase mb-4">Témoignages</span>
                    <h2 ref={titleRef} className="text-5xl md:text-7xl font-display font-bold uppercase text-white">
                        Ce qu'ils <span className="text-white opacity-80">disent</span>
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div
                            key={item.id}
                            ref={addToRefs}
                            className="group relative p-8 md:p-10 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md transition-all duration-500 hover:bg-white/20 hover:border-white/40 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
                        >
                            {/* Quote Icon */}
                            <div className="text-4xl text-white font-display mb-6 opacity-40">“</div>

                            <p className="text-lg font-sans text-white/90 leading-relaxed mb-8 relative z-10">
                                {item.quote}
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent grayscale group-hover:grayscale-0 transition-all duration-500" />
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-white">{item.author}</h4>
                                    <span className="text-xs text-accent-2 uppercase tracking-tight">{item.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
