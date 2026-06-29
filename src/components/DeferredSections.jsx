import Skills from "./Skills";
import Projects from "./Projects";
import OpenSource from "./OpenSource";
import Education from "./Education";
import Contact from "./Contact";
import ScrollToTopButton from "./ScrollToTopButton";

export default function DeferredSections() {
    return (
        <>
            <Skills />
            <Projects />
            <OpenSource />
            <Education />
            <Contact />
            <ScrollToTopButton />
        </>
    );
}
