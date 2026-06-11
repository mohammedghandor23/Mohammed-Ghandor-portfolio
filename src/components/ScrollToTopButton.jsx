import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
    const { t } = useTranslation();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const scrollableHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            if (scrollableHeight <= 0) {
                setProgress(0);
                return;
            }

            const nextProgress = Math.min(
                Math.max(scrollTop / scrollableHeight, 0),
                1,
            );
            setProgress(nextProgress);
        };

        updateProgress();
        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress);

        return () => {
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", updateProgress);
        };
    }, []);

    const progressDegrees = useMemo(() => progress * 360, [progress]);
    const isVisible = progress > 0.05;

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    type="button"
                    onClick={handleScrollToTop}
                    initial={{ opacity: 0, y: 20, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.9 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[70] w-[52px] h-[52px] rounded-full shadow-xl shadow-black/35"
                    aria-label={t("common.scrollToTop")}
                >
                    <span
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: `conic-gradient(#7c3aed ${progressDegrees}deg, rgba(255, 255, 255, 0.18) ${progressDegrees}deg)`,
                        }}
                    />
                    <span className="absolute inset-[2px] rounded-full bg-primary/95 backdrop-blur-md" />
                    <span className="relative flex items-center justify-center w-full h-full">
                        <ArrowUp size={18} className="text-white" />
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
