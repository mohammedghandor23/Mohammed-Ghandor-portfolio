import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    Smartphone,
    Layers,
    Globe,
    Layout,
    GitBranch,
    Brain,
    Users,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const skillCategories = [
    {
        id: "leader",
        icon: Users,
        color: "from-emerald-500 to-teal-400",
    },
    {
        id: "mobile",
        icon: Smartphone,
        color: "from-blue-500 to-cyan-400",
    },
    {
        id: "state",
        icon: Layers,
        color: "from-purple-500 to-pink-400",
    },
    {
        id: "backend",
        icon: Globe,
        color: "from-green-500 to-emerald-400",
    },
    {
        id: "architecture",
        icon: Layout,
        color: "from-indigo-500 to-blue-400",
    },
    {
        id: "version",
        icon: GitBranch,
        color: "from-red-500 to-orange-400",
    },
    {
        id: "problemSolving",
        icon: Brain,
        color: "from-violet-500 to-purple-400",
    },
];

export default function Skills() {
    const { t } = useTranslation();

    return (
        <section id="skills" className="section-padding defer-section">
            <div className="site-container">
                <SectionHeading
                    title={t("skills.title")}
                    subtitle={t("skills.subtitle")}
                />

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {skillCategories.map((cat, i) => {
                        const tags = t(`skills.items.${cat.id}.tags`, {
                            returnObjects: true,
                        });

                        return (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                className="glass-card glass-card-hover p-6 group"
                            >
                                <div
                                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <cat.icon size={20} className="text-white" />
                                </div>

                                <h3 className="text-white font-semibold text-base mb-3">
                                    {t(`skills.items.${cat.id}.title`)}
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {tags.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1.5 text-xs font-medium text-text-secondary bg-white/5 rounded-lg border border-white/5"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
