import { useEffect, useRef } from "react";

const GLOW_SIZE = 620;
const RING_SIZE = 36;
const DOT_SIZE = 6;

/**
 * Cursor followers: a large ambient light orb that drifts behind the
 * content, plus a crisp ring + dot that trail the cursor above it.
 * Desktop-only; eased with a single rAF loop, no React re-renders.
 */
export default function CursorGlow() {
    const glowRef = useRef(null);
    const ringRef = useRef(null);
    const dotRef = useRef(null);

    useEffect(() => {
        const glow = glowRef.current;
        const ring = ringRef.current;
        const dot = dotRef.current;
        if (
            !glow ||
            !ring ||
            !dot ||
            !window.matchMedia("(pointer: fine)").matches ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        const targets = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
        const layers = [
            { el: glow, x: targets.x, y: targets.y, ease: 0.075, size: GLOW_SIZE },
            { el: ring, x: targets.x, y: targets.y, ease: 0.2, size: RING_SIZE },
            { el: dot, x: targets.x, y: targets.y, ease: 0.45, size: DOT_SIZE },
        ];

        let frame = 0;
        let visible = false;

        const render = () => {
            let settled = true;

            for (const layer of layers) {
                layer.x += (targets.x - layer.x) * layer.ease;
                layer.y += (targets.y - layer.y) * layer.ease;
                layer.el.style.transform = `translate3d(${(layer.x - layer.size / 2).toFixed(1)}px, ${(layer.y - layer.size / 2).toFixed(1)}px, 0)`;

                if (
                    Math.abs(targets.x - layer.x) > 0.3 ||
                    Math.abs(targets.y - layer.y) > 0.3
                ) {
                    settled = false;
                }
            }

            frame = settled ? 0 : requestAnimationFrame(render);
        };

        const onMove = (e) => {
            targets.x = e.clientX;
            targets.y = e.clientY;

            if (!visible) {
                visible = true;
                glow.style.opacity = "1";
                ring.style.opacity = "1";
                dot.style.opacity = "1";
            }

            if (!frame) {
                frame = requestAnimationFrame(render);
            }
        };

        window.addEventListener("pointermove", onMove, { passive: true });

        return () => {
            window.removeEventListener("pointermove", onMove);
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <>
            {/* Ambient orb drifting behind the content */}
            <div
                ref={glowRef}
                aria-hidden="true"
                className="fixed left-0 top-0 z-[1] pointer-events-none rounded-full opacity-0 transition-opacity duration-700"
                style={{
                    width: GLOW_SIZE,
                    height: GLOW_SIZE,
                    background:
                        "radial-gradient(circle, rgba(139,92,246,0.22), rgba(59,130,246,0.13) 38%, rgba(34,211,238,0.05) 58%, transparent 70%)",
                    willChange: "transform",
                }}
            />

            {/* Trailing ring + dot above the content */}
            <div
                ref={ringRef}
                aria-hidden="true"
                className="fixed left-0 top-0 z-[75] pointer-events-none rounded-full opacity-0 transition-opacity duration-500"
                style={{
                    width: RING_SIZE,
                    height: RING_SIZE,
                    border: "1.5px solid rgba(167,139,250,0.75)",
                    boxShadow:
                        "0 0 14px rgba(139,92,246,0.45), inset 0 0 10px rgba(139,92,246,0.18)",
                }}
            />
            <div
                ref={dotRef}
                aria-hidden="true"
                className="fixed left-0 top-0 z-[75] pointer-events-none rounded-full opacity-0 transition-opacity duration-500"
                style={{
                    width: DOT_SIZE,
                    height: DOT_SIZE,
                    background: "linear-gradient(135deg, #a78bfa, #22d3ee)",
                    boxShadow: "0 0 10px rgba(167,139,250,0.9)",
                }}
            />
        </>
    );
}
