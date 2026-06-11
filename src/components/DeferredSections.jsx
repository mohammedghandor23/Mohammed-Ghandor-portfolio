import Skills from "./Skills";
import Projects from "./Projects";
import Education from "./Education";
import Contact from "./Contact";
import ScrollToTopButton from "./ScrollToTopButton";

export default function DeferredSections() {
    return (
        <>
            <Skills />
            <Projects />
            <Education />
            <Contact />
            <ScrollToTopButton />
        </>
    );
}
