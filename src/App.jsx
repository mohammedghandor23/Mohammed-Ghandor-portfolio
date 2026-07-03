import { lazy, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScrollProgress from "./components/fx/ScrollProgress";

const AmbientBackground = lazy(() => import("./components/AmbientBackground"));
const CursorGlow = lazy(() => import("./components/fx/CursorGlow"));
const DeferredSections = lazy(() => import("./components/DeferredSections"));

function IntroOverlay() {
    const { t } = useTranslation();
    const [gone, setGone] = useState(
        () =>
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );

    useEffect(() => {
        const timer = window.setTimeout(() => setGone(true), 1900);
        return () => window.clearTimeout(timer);
    }, []);

    if (gone) {
        return null;
    }

    return (
        <div className="intro-overlay" aria-hidden="true">
            <span className="intro-ring" />
            <span className="intro-logo gradient-text">
                {t("intro.welcome")}
            </span>
        </div>
    );
}

function DeferredSectionsFallback() {
    return (
        <>
            <section id="skills" className="section-padding min-h-[70vh]" />
            <section id="projects" className="section-padding min-h-[90vh]" />
            <section id="education" className="section-padding min-h-[55vh]" />
            <section id="contact" className="section-padding min-h-[55vh]" />
        </>
    );
}

function App() {
    return (
        <div className="relative min-h-screen bg-primary">
            <IntroOverlay />
            <ScrollProgress />
            <Suspense fallback={null}>
                <AmbientBackground />
            </Suspense>
            <Suspense fallback={null}>
                <CursorGlow />
            </Suspense>

            <div className="relative z-10">
                <Navbar />
                <Hero />
                <Suspense fallback={<DeferredSectionsFallback />}>
                    <DeferredSections />
                </Suspense>
            </div>
        </div>
    );
}

export default App;
