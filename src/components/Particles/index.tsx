import { useEffect, useRef } from "react";

interface Props {
    colors?: string[];
    density?: number;
    maxParticles?: number;
    opacity?: number;
    lineColor?: string;
    lineDistance?: number;
    speed?: number;
    radius?: [number, number];
    className?: string;
}

// Canvas-based drifting particle field with nearby-particle connecting
// lines ("constellation" look) — genuinely animated motion, unlike a
// blurred static blob. Reads prefers-reduced-motion and draws one static
// frame instead of looping when set.
const Particles = ({
    colors = ["#4267B2", "#0AD1FF", "#FF5A00"],
    density = 0.00009,
    maxParticles = 140,
    opacity = 0.6,
    lineColor = "148,163,184",
    lineDistance = 120,
    speed = 0.25,
    radius = [1, 2.6],
    className = "",
}: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        let width = 0;
        let height = 0;
        let animationId = 0;
        let particles: { x: number; y: number; vx: number; vy: number; r: number; color: string }[] = [];

        const resize = () => {
            const parent = canvas.parentElement;
            width = parent ? parent.clientWidth : window.innerWidth;
            height = parent ? parent.clientHeight : window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.min(Math.round(width * height * density), maxParticles);
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * speed,
                vy: (Math.random() - 0.5) * speed,
                r: radius[0] + Math.random() * (radius[1] - radius[0]),
                color: colors[Math.floor(Math.random() * colors.length)],
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < lineDistance) {
                        ctx.strokeStyle = `rgba(${lineColor},${(1 - dist / lineDistance) * 0.5})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            ctx.globalAlpha = opacity;
            for (const p of particles) {
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
        };

        const step = () => {
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;
            }
            draw();
            animationId = requestAnimationFrame(step);
        };

        resize();
        window.addEventListener("resize", resize);

        if (prefersReducedMotion) {
            draw();
        } else {
            animationId = requestAnimationFrame(step);
        }

        return () => {
            window.removeEventListener("resize", resize);
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, [colors, density, maxParticles, opacity, lineColor, lineDistance, speed, radius]);

    return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true" />;
};

export default Particles;
