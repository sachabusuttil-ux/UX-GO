"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        if (isFormOpen && formRef.current) {
            setTimeout(() => {
                formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100);
        }
    }, [isFormOpen]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleSubmit = () => {
        setIsSubmitting(true);
        // FormSubmit handles the submission, we just show state
        setTimeout(() => setIsSubmitting(false), 2000); // Reset state after potential redirect/submit
    };

    return (
        <section ref={containerRef} className="relative w-full py-24 px-4 md:px-20 bg-white text-black overflow-hidden">

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center gap-16">
                {/* Centered Title Block */}
                <div className="text-center max-w-3xl mx-auto">
                    <span className="block text-black/50 text-sm tracking-[0.3em] font-sans font-bold uppercase mb-8">Contact</span>
                    <h2 className="text-6xl md:text-[9vw] leading-[0.8] font-display font-black uppercase text-black mb-8 whitespace-nowrap">
                        Let&apos;s Talk
                    </h2>
                    <p className="text-neutral-500 text-lg md:text-xl font-sans font-medium mb-8">
                        Un projet ? Une question ? On vous répond sous 24h.
                    </p>


                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => setIsFormOpen(!isFormOpen)}
                            className={cn(
                                "inline-flex items-center gap-3 px-8 py-3 rounded-full border transition-all duration-300",
                                isFormOpen
                                    ? "bg-black text-white border-black"
                                    : "bg-black text-white border-black hover:bg-neutral-800"
                            )}
                        >
                            <span className="uppercase tracking-widest font-bold text-sm">Nous écrire</span>
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 3H6C4.9 3 4 3.9 4 5V19C4 20.1 4.9 21 6 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H6V5H19V19ZM8 17H10V7H8V17ZM12 17H14V7H12V17ZM16 17H18V7H16V17Z" />
                            </svg>
                        </button>

                        <a
                            href="https://calendly.com/sacha-busuttil-pro/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-black/10 bg-neutral-50 hover:bg-black hover:text-white transition-all group"
                        >
                            <span className="uppercase tracking-widest font-bold text-sm">Réserver un appel</span>
                            <svg className="w-4 h-4 group-hover:fill-white transition-colors" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8ZM9 14H7V12H9V14ZM13 14H11V12H13V14ZM17 14H15V12H17V14ZM9 18H7V16H9V18ZM13 18H11V16H13V18ZM17 18H15V16H17V18Z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Centered Form */}
            <div className={cn(
                "w-full max-w-2xl mx-auto overflow-hidden transition-all duration-700 ease-in-out",
                isFormOpen ? "max-h-[800px] opacity-100 mt-12" : "max-h-0 opacity-0 mt-0"
            )}>
                <form
                    ref={formRef}
                    action="https://formsubmit.co/sacha.busuttil.pro@gmail.com"
                    method="POST"
                    className="space-y-8"
                    onSubmit={handleSubmit}
                >
                    {/* Honeypot & Configuration */}
                    <input type="text" name="_honey" style={{ display: "none" }} />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_next" value="https://uxgo.studio" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 text-left">
                            <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Nom</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                className="w-full bg-neutral-100 border-none rounded-lg px-5 py-4 text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all font-sans"
                                placeholder="Votre nom"
                            />
                        </div>

                        <div className="space-y-2 text-left">
                            <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="w-full bg-neutral-100 border-none rounded-lg px-5 py-4 text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all font-sans"
                                placeholder="votre@email.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 text-left">
                        <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Sujet</label>
                        <div className="relative">
                            <select
                                name="subject"
                                id="subject"
                                className="w-full bg-neutral-100 border-none rounded-lg px-5 py-4 text-black focus:outline-none focus:ring-2 focus:ring-black/10 transition-all font-sans appearance-none cursor-pointer"
                            >
                                <option value="Projet Design">Projet Design</option>
                                <option value="Développement">Développement</option>
                                <option value="Audit UX">Audit UX</option>
                                <option value="Autre">Autre</option>
                            </select>
                            {/* Custom Chevron */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 text-left">
                        <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-neutral-500 ml-1">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            required
                            rows={6}
                            className="w-full bg-neutral-100 border-none rounded-lg px-5 py-4 text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all font-sans resize-none"
                            placeholder="Dites-nous tout..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                            "py-4 px-12 rounded-full font-sans uppercase font-bold tracking-widest transition-all duration-300 border border-black",
                            isSubmitting
                                ? "bg-black/10 text-black cursor-not-allowed"
                                : "bg-black text-white hover:bg-white hover:text-black"
                        )}
                    >
                        {isSubmitting ? "Envoi..." : "Envoyer"}
                    </button>
                </form>
            </div>
        </section>
    );
}
