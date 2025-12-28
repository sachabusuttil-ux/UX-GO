"use client";

import { useEffect, useRef } from "react";

interface InteractiveGridProps {
    className?: string; // Allow passing existing Tailwind classes
}

export default function InteractiveGrid({ className }: InteractiveGridProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: 0, y: 0, isActive: false });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const gridSize = 30; // Distance between lines
        const nodeColor = "rgba(255, 255, 255, 0.15)";

        // Configuration for the "Weight" effect
        const influenceRadius = 1200; // How far the distortion reaches
        const strength = 0.01; // How strong the "pull" is (0 to 1)

        // Generate grid nodes
        // We create a grid of points that we will then connect with lines
        const cols = Math.ceil(width / gridSize) + 1;
        const rows = Math.ceil(height / gridSize) + 1;
        const nodes: { x: number; y: number; originX: number; originY: number }[] = [];

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = i * gridSize;
                const y = j * gridSize;
                nodes.push({ x, y, originX: x, originY: y });
            }
        }

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            // Re-generate nodes on resize (simple approach)
            nodes.length = 0;
            const newCols = Math.ceil(width / gridSize) + 1;
            const newRows = Math.ceil(height / gridSize) + 1;
            for (let i = 0; i < newCols; i++) {
                for (let j = 0; j < newRows; j++) {
                    const x = i * gridSize;
                    const y = j * gridSize;
                    nodes.push({ x, y, originX: x, originY: y });
                }
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Disable on touch devices / no-hover devices
            if (window.matchMedia("(hover: none)").matches) return;

            const rect = canvas.getBoundingClientRect();
            mouse.current.x = e.clientX - rect.left;
            mouse.current.y = e.clientY - rect.top;
            mouse.current.isActive = true;
        };

        const handleMouseLeave = () => {
            mouse.current.isActive = false;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        // We attach mousemove to window so it tracks even if cursor is over overlaying text elements

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Update node positions
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];

                let targetX = node.originX;
                let targetY = node.originY;

                // Apply distortion if mouse is active (or just easing back)
                // We want the "weight" effect: points are PULLED towards the mouse center
                // but limited by distance.

                if (mouse.current.isActive) {
                    const dx = mouse.current.x - node.originX;
                    const dy = mouse.current.y - node.originY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < influenceRadius) {
                        // Calculate distortion factor (non-linear looks better)
                        // A simple "gravity" pull: 
                        // The closer to center, the more it moves towards center.
                        // Force is 1 at center, 0 at edge.
                        const force = Math.pow((influenceRadius - dist) / influenceRadius, 2) * strength * influenceRadius;
                        const angle = Math.atan2(dy, dx);

                        // Move Point TOWARDS mouse
                        targetX += Math.cos(angle) * force;
                        targetY += Math.sin(angle) * force;
                    }
                }

                // Smooth easing (Lerp) to target
                node.x += (targetX - node.x) * 0.1;
                node.y += (targetY - node.y) * 0.1;
            }

            // Draw Dots with Diamond Gradient (White -> Purple)
            const centerX = width / 2;
            const centerY = height / 2;
            const maxDist = width / 2 + height / 2; // Approx max Manhattan distance

            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];

                // Calculate Diamond Distance (Manhattan)
                const dist = Math.abs(node.x - centerX) + Math.abs(node.y - centerY);
                const t = Math.min(dist / (maxDist * 0.8), 1); // 0 (center) -> 1 (edges)

                // Interpolate Color: Purple (94,20,223) -> White (255,255,255)
                const r = 94 * (1 - t) + 255 * t;
                const g = 20 * (1 - t) + 255 * t;
                const b = 223 * (1 - t) + 255 * t;

                // Slightly higher opacity for visibility of the gradient
                ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 0.4)`;

                ctx.beginPath();
                ctx.arc(node.x, node.y, 1.2, 0, Math.PI * 2);
                ctx.fill();
            }
            requestAnimationFrame(draw);
        };

        const animationId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
        />
    );
}
