import { useEffect, useRef } from "react";

/**
 * Magnetic hover wrapper: the child gently follows the cursor while
 * hovered and springs back on leave. Desktop-only, presentation-only.
 */
export default function Magnetic({ children, strength = 0.22, className = "" }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (
            !el ||
            !window.matchMedia("(pointer: fine)").matches ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        let frame = 0;

        const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            const dx = (e.clientX - rect.left - rect.width / 2) * strength;
            const dy = (e.clientY - rect.top - rect.height / 2) * strength;

            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
            });
        };

        const onLeave = () => {
            cancelAnimationFrame(frame);
            el.style.transform = "translate3d(0, 0, 0)";
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);

        return () => {
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerleave", onLeave);
            cancelAnimationFrame(frame);
        };
    }, [strength]);

    return (
        <div ref={ref} className={`magnetic-wrap ${className}`}>
            {children}
        </div>
    );
}
