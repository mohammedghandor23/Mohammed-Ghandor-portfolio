import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageSlider({ images, alt, size = "default" }) {
    const { t } = useTranslation();
    const [current, setCurrent] = useState(0);
    const [inView, setInView] = useState(false);
    const [loadedIndices, setLoadedIndices] = useState(() => new Set([0]));
    const sliderRef = useRef(null);

    useEffect(() => {
        const node = sliderRef.current;
        if (!node) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "240px 0px" },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!inView) {
            return;
        }

        setLoadedIndices((prev) => {
            if (prev.has(current)) {
                return prev;
            }

            const next = new Set(prev);
            next.add(current);
            return next;
        });
    }, [current, inView]);

    const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
    const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

    const containerClass =
        size === "sm"
            ? "w-[220px] h-[420px]"
            : "w-[280px] h-[530px] sm:w-[300px] sm:h-[560px]";
    const previousIndex = current === 0 ? images.length - 1 : current - 1;
    const nextIndex = current === images.length - 1 ? 0 : current + 1;
    const shouldLoadImage = useMemo(
        () => (index) =>
            inView &&
            (index === current ||
                index === previousIndex ||
                index === nextIndex ||
                loadedIndices.has(index)),
        [current, inView, loadedIndices, nextIndex, previousIndex],
    );

    return (
        <div
            ref={sliderRef}
            className={`relative ${containerClass} mx-auto overflow-hidden rounded-2xl bg-black/40`}
        >
            {images.map((src, i) => (
                <img
                    key={i}
                    src={shouldLoadImage(i) ? src : undefined}
                    alt={`${alt} ${t("common.screenshot")} ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                        i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                    loading="lazy"
                    decoding="async"
                    fetchPriority={i === current && inView ? "high" : "low"}
                />
            ))}

            <button
                onClick={prev}
                className="absolute z-20 left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-all"
                aria-label={t("common.previousImage")}
            >
                <ChevronLeft size={18} />
            </button>
            <button
                onClick={next}
                className="absolute z-20 right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-all"
                aria-label={t("common.nextImage")}
            >
                <ChevronRight size={18} />
            </button>

            <div className="absolute z-20 bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            i === current
                                ? "bg-white w-5"
                                : "bg-white/30 hover:bg-white/50 w-2"
                        }`}
                        aria-label={t("common.goToImage", { index: i + 1 })}
                    />
                ))}
            </div>
        </div>
    );
}
