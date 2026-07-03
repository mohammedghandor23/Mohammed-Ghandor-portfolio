import Skills from "./Skills";
import Projects from "./Projects";
import OpenSource from "./OpenSource";
import Education from "./Education";
import Contact from "./Contact";
import ScrollToTopButton from "./ScrollToTopButton";

function SectionDivider() {
    return <div aria-hidden="true" className="section-divider" />;
}

export default function DeferredSections() {
    return (
        <>
            <SectionDivider />
            <Skills />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <OpenSource />
            <SectionDivider />
            <Education />
            <SectionDivider />
            <Contact />
            <ScrollToTopButton />
        </>
    );
}
