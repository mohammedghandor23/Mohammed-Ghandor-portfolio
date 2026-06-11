import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GraduationCap, Globe } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function Education() {
    const { t } = useTranslation();

    return (
        <section id="education" className="section-padding defer-section">
            <div className="site-container">
                <SectionHeading
                    title={t("education.title")}
                    subtitle={t("education.subtitle")}
                />

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5 }}
                        className="glass-card glass-card-hover p-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/5 rounded-full blur-3xl" />

                        <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6">
                                <GraduationCap size={26} className="text-white" />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">
                                {t("education.degreeTitle")}
                            </h3>
                            <p className="text-accent-purple font-medium text-sm mb-4">
                                {t("education.degreeSpecialization")}
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-purple mt-2 flex-shrink-0" />
                                    <div>
                                        <p className="text-text-secondary text-sm">
                                            {t("education.university")} {" "}
                                            <span className="text-text-muted">
                                                {t("education.universityFormerly")}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0" />
                                    <p className="text-text-secondary text-sm">
                                        {t("education.year")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="glass-card glass-card-hover p-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-full blur-3xl" />

                        <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-6">
                                <Globe size={26} className="text-white" />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-6">
                                {t("education.languagesTitle")}
                            </h3>

                            <div className="space-y-5">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white font-medium text-sm">
                                            {t("education.arabic")}
                                        </span>
                                        <span className="text-text-muted text-xs">
                                            {t("education.arabicLevel")}
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "100%" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.3 }}
                                            className="h-full bg-gradient-accent rounded-full"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white font-medium text-sm">
                                            {t("education.english")}
                                        </span>
                                        <span className="text-text-muted text-xs">
                                            {t("education.englishLevel")}
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "82%" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.4 }}
                                            className="h-full bg-gradient-accent rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
