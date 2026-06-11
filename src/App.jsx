import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const AmbientBackground = lazy(() => import("./components/AmbientBackground"));
const DeferredSections = lazy(() => import("./components/DeferredSections"));

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
            <Suspense fallback={null}>
                <AmbientBackground />
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
