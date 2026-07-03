import { useEffect, useRef } from "react";

/**
 * Thin gradient reading-progress bar pinned to the top of the viewport.
 * Transform-only updates via rAF, so it never triggers layout or React renders.
 */
export default function ScrollProgress() {
    const barRef = useRef(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) {
            return;
        }

        bar.style.transformOrigin =
            document.documentElement.dir === "rtl" ? "100% 50%" : "0% 50%";

        let frame = 0;

        const update = () => {
            frame = 0;
            const max =
                document.documentElement.scrollHeight - window.innerHeight;
            const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
            bar.style.transform = `scaleX(${progress.toFixed(4)})`;
        };

        const onScroll = () => {
            if (!frame) {
                frame = requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-[80] h-[3px] pointer-events-none"
        >
            <div
                ref={barRef}
                className="h-full w-full bg-gradient-to-r from-accent-purple via-accent-blue to-cyan-400 shadow-[0_0_14px_rgba(124,58,237,0.65)]"
                style={{ transform: "scaleX(0)" }}
            />
        </div>
    );
}
