import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Magnetic from "./fx/Magnetic";

export default function Hero() {
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const portraitRef = useRef(null);

    const scrollToSection = (selector) => (e) => {
        e.preventDefault();
        document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const section = sectionRef.current;
        const portrait = portraitRef.current;
        if (
            !section ||
            !portrait ||
            !window.matchMedia("(pointer: fine)").matches ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        let frame = 0;

        const onMove = (e) => {
            const rect = section.getBoundingClientRect();
            const nx = (e.clientX - rect.left) / rect.width - 0.5;
            const ny = (e.clientY - rect.top) / rect.height - 0.5;

            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                portrait.style.transform = `translate3d(${(nx * 16).toFixed(1)}px, ${(ny * 12).toFixed(1)}px, 0)`;
            });
        };

        const onLeave = () => {
            cancelAnimationFrame(frame);
            portrait.style.transform = "translate3d(0, 0, 0)";
        };

        section.addEventListener("pointermove", onMove, { passive: true });
        section.addEventListener("pointerleave", onLeave);

        return () => {
            section.removeEventListener("pointermove", onMove);
            section.removeEventListener("pointerleave", onLeave);
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.08),transparent_54%)]" />

            <div className="relative z-10 site-container flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 max-lg:mt-36">
                <div className="w-full lg:flex-1">
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-start">
                        <h1 className="hero-reveal [animation-delay:120ms] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-4">
                            {t("hero.name.first")}{" "}
                            <span className="gradient-text">{t("hero.name.last")}</span>
                        </h1>

                        <p className="hero-reveal [animation-delay:200ms] text-lg md:text-xl text-text-secondary font-light mb-3">
                            {t("hero.role.flutter")}{" "}
                            <span className="text-white/20">|</span>{" "}
                            {t("hero.role.engineer")}
                        </p>

                        <div className="hero-reveal [animation-delay:280ms] w-full max-w-2xl mb-8">
                            <div>
                                <p className="text-text-secondary leading-relaxed text-base md:text-lg font-light">
                                    {t("hero.bio.educationPrefix")}{" "}
                                    <span className="text-white font-medium">
                                        {t("hero.bio.educationHighlight")}
                                    </span>{" "}
                                    {t("hero.bio.educationSuffix")}
                                </p>
                                <p className="text-text-secondary leading-relaxed text-base md:text-lg font-light mt-4">
                                    {t("hero.bio.rankPrefix")}{" "}
                                    <span className="gradient-text font-semibold">
                                        {t("hero.bio.rankHighlight")}
                                    </span>{" "}
                                    {t("hero.bio.rankMiddle")}{" "}
                                    <span className="text-white font-medium">
                                        {t("hero.bio.rankSolved")}
                                    </span>{" "}
                                    {t("hero.bio.rankSuffix")}
                                </p>
                                <p className="text-text-secondary leading-relaxed text-base md:text-lg font-light mt-4">
                                    {t("hero.bio.experiencePrefix")}{" "}
                                    <span className="text-white font-medium">
                                        {t("hero.bio.experienceHighlight")}
                                    </span>{" "}
                                    {t("hero.bio.experienceSuffix")}
                                </p>
                            </div>
                        </div>

                        <div className="hero-reveal [animation-delay:360ms] flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Magnetic>
                                <a
                                    href="#projects"
                                    onClick={scrollToSection("#projects")}
                                    className="group relative px-8 py-3.5 bg-gradient-accent rounded-xl text-white font-medium text-sm overflow-hidden shadow-[0_10px_30px_rgba(124,58,237,0.28)] hover:shadow-[0_16px_44px_rgba(124,58,237,0.42)] transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.28)_50%,transparent_65%)] -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                                    <span className="relative">{t("hero.cta.work")}</span>
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a
                                    href="#contact"
                                    onClick={scrollToSection("#contact")}
                                    className="px-8 py-3.5 rounded-xl text-text-secondary font-medium text-sm border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-accent-purple/40 hover:text-white hover:shadow-[0_0_28px_rgba(124,58,237,0.18)] transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    {t("hero.cta.contact")}
                                </a>
                            </Magnetic>
                        </div>
                    </div>
                </div>

                <div className="hero-reveal [animation-delay:180ms] w-full lg:flex-1 flex justify-center lg:justify-end">
                    <div
                        ref={portraitRef}
                        className="hero-portrait transition-transform duration-500 ease-out"
                    >
                        <span aria-hidden="true" className="hero-portrait-glow" />
                        <span aria-hidden="true" className="hero-portrait-ring hero-portrait-ring--outer" />
                        <span aria-hidden="true" className="hero-portrait-ring" />
                        <span aria-hidden="true" className="hero-orbit">
                            <span className="hero-orbit-dot" />
                        </span>
                        <span aria-hidden="true" className="hero-orbit hero-orbit--slow">
                            <span className="hero-orbit-dot" />
                        </span>
                        <img
                            src="/assets/me.png"
                            alt={`${t("hero.name.first")} ${t("hero.name.last")}`}
                            width={720}
                            height={1280}
                            loading="eager"
                            decoding="async"
                            fetchPriority="high"
                            className="hero-image-float relative w-[240px] sm:w-[320px] md:w-[360px] lg:w-[420px] xl:w-[500px] max-w-full aspect-square object-cover rounded-full transition-all duration-500"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
