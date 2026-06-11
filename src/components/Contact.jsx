import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";

const PHONE_LINK = "tel:+963980895956";

export default function Contact() {
    const { t } = useTranslation();

    const email = t("contact.values.email");
    const phone = t("contact.values.phone");
    const location = t("contact.values.location");
    const subject = t("contact.mailSubject");

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        email,
    )}&su=${encodeURIComponent(subject)}`;

    const contactInfo = [
        {
            icon: Mail,
            label: t("contact.labels.email"),
            value: email,
            href: gmailLink,
            accent: "from-accent-purple/30 to-accent-blue/20",
            cardClass: "sm:col-span-2",
            valueClass: "break-words",
        },
        {
            icon: Phone,
            label: t("contact.labels.phone"),
            value: phone,
            href: PHONE_LINK,
            accent: "from-emerald-400/20 to-cyan-400/10",
        },
        {
            icon: MapPin,
            label: t("contact.labels.location"),
            value: location,
            href: null,
            accent: "from-amber-400/20 to-rose-400/10",
        },
    ];

    const handleSendEmail = (e) => {
        e.preventDefault();

        const gmailWindow = window.open(
            gmailLink,
            "_blank",
            "noopener,noreferrer",
        );

        if (!gmailWindow) {
            window.location.href = mailtoLink;
        }
    };

    return (
        <section
            id="contact"
            className="section-padding defer-section relative overflow-hidden"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(124,58,237,0.14),transparent_58%)]" />

            <div className="site-container relative">
                <SectionHeading
                    title={t("contact.title")}
                    subtitle={t("contact.subtitle")}
                />

                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.55 }}
                        className="glass-card p-6 md:p-8 lg:p-10 relative overflow-hidden"
                    >
                        <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent-purple/10 rounded-full blur-[90px]" />
                        <div className="absolute -bottom-28 -left-20 w-72 h-72 bg-accent-blue/10 rounded-full blur-[90px]" />

                        <div className="relative grid lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7 flex flex-col"
                            >
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-text-secondary w-fit">
                                    <span className="glow-dot" />
                                    {t("contact.quickTitle")}
                                </div>

                                <p className="mt-4 text-text-secondary leading-relaxed text-sm md:text-base">
                                    {t("contact.quickText")}
                                </p>

                                <div className="mt-auto pt-7 flex flex-col sm:flex-row lg:flex-col gap-3">
                                    <motion.a
                                        href={gmailLink}
                                        onClick={handleSendEmail}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02, y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-accent rounded-xl text-white text-sm font-medium hover:shadow-lg hover:shadow-accent-purple/25 transition-all duration-300"
                                    >
                                        <Send size={16} />
                                        {t("contact.openGmail")}
                                    </motion.a>

                                    <a
                                        href={PHONE_LINK}
                                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-text-secondary text-sm font-medium hover:border-white/20 hover:text-white transition-all duration-300"
                                    >
                                        <Phone size={16} />
                                        {t("contact.callNow")}
                                    </a>
                                </div>
                            </motion.div>

                            <div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {contactInfo.map((item, i) => (
                                        <motion.div
                                            key={item.label}
                                            initial={{ opacity: 0, y: 24 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.45,
                                                delay: i * 0.08,
                                            }}
                                            className={`group relative rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6 overflow-hidden ${item.cardClass || ""}`}
                                        >
                                            <div
                                                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                            />

                                            <div className="relative">
                                                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:border-accent-purple/30">
                                                    <item.icon
                                                        size={19}
                                                        className="text-text-secondary group-hover:text-white transition-colors"
                                                    />
                                                </div>

                                                <p className="text-text-muted text-[11px] uppercase tracking-[0.18em] mb-2">
                                                    {item.label}
                                                </p>

                                                {item.href ? (
                                                    <a
                                                        href={item.href}
                                                        className={`text-white text-sm font-medium leading-relaxed hover:text-accent-purple transition-colors ${item.valueClass || ""}`}
                                                    >
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-white text-sm font-medium leading-relaxed">
                                                        {item.value}
                                                    </p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
