import { useCallback, useEffect, useRef } from "react";

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Presentation-only wrapper: 3D tilt following the mouse + a spotlight
 * highlight that tracks the cursor. Pure rAF + CSS vars (no re-renders).
 * Inert on touch devices and when reduced motion is requested.
 */
export default function TiltCard({
    children,
    className = "",
    tiltMax = 6,
    lift = 4,
    spotlight = true,
    ...rest
}) {
    const ref = useRef(null);
    const frame = useRef(0);

    useEffect(() => () => cancelAnimationFrame(frame.current), []);

    const handlePointerMove = useCallback(
        (e) => {
            const el = ref.current;
            if (!el || e.pointerType !== "mouse") {
                return;
            }

            const rect = el.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;

            cancelAnimationFrame(frame.current);
            frame.current = requestAnimationFrame(() => {
                el.style.setProperty("--spot-x", `${(px * 100).toFixed(2)}%`);
                el.style.setProperty("--spot-y", `${(py * 100).toFixed(2)}%`);

                if (tiltMax > 0 && !prefersReducedMotion()) {
                    const rx = ((0.5 - py) * tiltMax).toFixed(2);
                    const ry = ((px - 0.5) * tiltMax).toFixed(2);
                    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(0, -${lift}px, 0)`;
                }
            });
        },
        [tiltMax, lift],
    );

    const handlePointerLeave = useCallback(() => {
        const el = ref.current;
        if (!el) {
            return;
        }

        cancelAnimationFrame(frame.current);
        el.style.transform = "";
    }, []);

    return (
        <div
            ref={ref}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className={`tilt-card ${className}`}
            {...rest}
        >
            {children}
            {spotlight && <span aria-hidden="true" className="card-spotlight" />}
        </div>
    );
}
