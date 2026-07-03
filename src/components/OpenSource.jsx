import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ExternalLink, Github } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ImageSlider from "./ImageSlider";
import TiltCard from "./fx/TiltCard";

function OpenSourceCard({ project, index, reversed, t }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
        <TiltCard
            tiltMax={0}
            className="glass-card gradient-border p-6 md:p-8 lg:p-10"
        >
            <div
                className={`flex flex-col ${
                    reversed ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-8 lg:gap-12 items-center`}
            >
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h3 className="text-2xl md:text-3xl font-bold gradient-text">
                            {project.title}
                        </h3>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-accent-purple/20 text-accent-purple border border-accent-purple/20">
                            {project.badge}
                        </span>
                    </div>

                    <p className="text-text-secondary text-sm md:text-base mb-2 font-medium">
                        {project.subtitle}
                    </p>

                    <p className="text-text-muted text-sm md:text-base leading-relaxed mb-5">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                        {project.tech.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1.5 text-xs font-medium text-text-secondary bg-white/5 rounded-lg border border-white/5 transition-colors duration-300 hover:text-white hover:border-accent-purple/40 hover:bg-accent-purple/10"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {project.githubLink && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium text-white border border-white/10 hover:border-accent-purple/40 hover:shadow-[0_8px_24px_rgba(124,58,237,0.18)] hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <Github size={16} />
                                {t("opensource.github")}
                            </a>
                        )}
                        {project.pubLink && (
                            <a
                                href={project.pubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium text-white border border-white/10 hover:border-accent-purple/40 hover:shadow-[0_8px_24px_rgba(124,58,237,0.18)] hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <ExternalLink size={16} />
                                {t("opensource.pub")}
                            </a>
                        )}
                    </div>
                </div>

                <div className="w-full lg:w-auto flex-shrink-0">
                    <ImageSlider images={project.images} alt={project.title} />
                </div>
            </div>
        </TiltCard>
        </motion.div>
    );
}

export default function OpenSource() {
    const { t } = useTranslation();

    const openSourceData = t("opensource.items", { returnObjects: true });
    const projects = Array.isArray(openSourceData) ? openSourceData : [];

    return (
        <section id="opensource" className="section-padding defer-section">
            <div className="site-container">
                <SectionHeading
                    title={t("opensource.title")}
                    subtitle={t("opensource.subtitle")}
                />

                <div className="space-y-8">
                    {projects.map((project, i) => (
                        <OpenSourceCard
                            key={project.id}
                            project={project}
                            index={i}
                            reversed={i % 2 !== 0}
                            t={t}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
