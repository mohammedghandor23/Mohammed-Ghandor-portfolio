import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const navLinks = [
    { key: "home", href: "#home" },
    { key: "skills", href: "#skills" },
    { key: "projects", href: "#projects" },
    { key: "education", href: "#education" },
    { key: "contact", href: "#contact" },
];

const languageOptions = ["en", "ar"];

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const languageTransitionTimers = useRef([]);

    const currentLanguage = i18n.resolvedLanguage === "ar" ? "ar" : "en";

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;

        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = previousOverflow || "";
        }

        return () => {
            document.body.style.overflow = previousOverflow || "";
        };
    }, [mobileOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = navLinks.map((l) => l.href.slice(1));
            const lastSection = sections[sections.length - 1];

            const viewportBottom = window.scrollY + window.innerHeight;
            const documentBottom = document.documentElement.scrollHeight;
            if (viewportBottom >= documentBottom - 2) {
                setActiveSection(lastSection);
                return;
            }

            const offset = 140;
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && window.scrollY + offset >= el.offsetTop) {
                    setActiveSection(sections[i]);
                    return;
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        return () => {
            languageTransitionTimers.current.forEach((timerId) =>
                window.clearTimeout(timerId),
            );
            languageTransitionTimers.current = [];
        };
    }, []);

    const handleClick = (href) => {
        setMobileOpen(false);
        setActiveSection(href.slice(1));

        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleLanguageChange = (lng) => {
        if (lng === currentLanguage) {
            return;
        }

        const root = document.documentElement;
        const runChange = () => i18n.changeLanguage(lng);
        const OUT_DURATION_MS = 170;
        const IN_DURATION_MS = 360;

        languageTransitionTimers.current.forEach((timerId) =>
            window.clearTimeout(timerId),
        );
        languageTransitionTimers.current = [];

        root.classList.remove("lang-switching-out", "lang-switching-in");
        root.classList.add("lang-switching-out");

        const outTimerId = window.setTimeout(() => {
            Promise.resolve(runChange()).finally(() => {
                root.classList.remove("lang-switching-out");
                root.classList.add("lang-switching-in");

                const inTimerId = window.setTimeout(() => {
                    root.classList.remove("lang-switching-in");
                }, IN_DURATION_MS);

                languageTransitionTimers.current.push(inTimerId);
            });
        }, OUT_DURATION_MS);

        languageTransitionTimers.current.push(outTimerId);
    };

    return (
        <>
            <nav
                className={`navbar-enter fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? "backdrop-blur-2xl bg-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                        : "backdrop-blur-xl bg-white/[0.03]"
                }`}
            >
                <div className="site-container">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <a
                            href="#home"
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick("#home");
                            }}
                            className="text-xl md:text-2xl font-bold tracking-tight transition-transform duration-200 hover:scale-[1.02]"
                        >
                            <span className="gradient-text text-2xl">MG</span>
                        </a>

                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href.slice(1);
                                return (
                                    <a
                                        key={link.key}
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleClick(link.href);
                                        }}
                                        className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                                            isActive
                                                ? "text-white"
                                                : "text-text-secondary hover:text-white"
                                        }`}
                                    >
                                        <span
                                            className={`absolute inset-0 bg-white/5 rounded-lg transition-opacity duration-200 ${
                                                isActive ? "opacity-100" : "opacity-0"
                                            }`}
                                        />
                                        <span className="relative z-10">
                                            {t(`navbar.links.${link.key}`)}
                                        </span>
                                    </a>
                                );
                            })}

                            <div className="ml-2 transition-transform duration-200 hover:-translate-y-[1px]">
                                <Select
                                    value={currentLanguage}
                                    onValueChange={handleLanguageChange}
                                >
                                    <SelectTrigger
                                        aria-label={t("navbar.language")}
                                        className="h-9 min-w-fit gap-2 border-transparent bg-white/[0.03] text-xs font-semibold text-white focus:ring-accent-purple/50"
                                    >
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languageOptions.map((lng) => (
                                            <SelectItem
                                                key={lng}
                                                value={lng}
                                                className="text-xs font-medium cursor-pointer"
                                            >
                                                {t(`common.language.${lng}`)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="md:hidden flex items-center gap-2">
                            <Select
                                value={currentLanguage}
                                onValueChange={handleLanguageChange}
                            >
                                <SelectTrigger
                                    aria-label={t("navbar.language")}
                                    className="h-10 min-w-[112px] border-transparent bg-white/[0.03] text-xs font-semibold text-white focus:ring-accent-purple/50"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {languageOptions.map((lng) => (
                                        <SelectItem
                                            key={lng}
                                            value={lng}
                                            className="text-xs font-medium cursor-pointer"
                                        >
                                            {t(`common.language.${lng}`)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <button
                                onClick={() => setMobileOpen((prev) => !prev)}
                                className="h-10 w-10 shrink-0 inline-flex items-center justify-center p-0 text-text-secondary hover:text-white transition-colors rounded-xl bg-white/[0.04]"
                                aria-label="Toggle menu"
                            >
                                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div
                className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-200 ${
                    mobileOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="absolute inset-0 w-full h-full bg-black/45 backdrop-blur-sm"
                    aria-label="Close menu overlay"
                />

                <aside
                    className={`absolute right-0 top-0 h-full w-[86%] max-w-[360px] rounded-l-3xl bg-[linear-gradient(180deg,rgba(19,19,26,0.88)_0%,rgba(10,10,16,0.95)_100%)] backdrop-blur-2xl shadow-[0_26px_70px_rgba(0,0,0,0.55)] overflow-hidden transition-transform duration-300 ease-out ${
                        mobileOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="pointer-events-none absolute -top-24 -left-12 w-64 h-64 rounded-full bg-accent-purple/20 blur-[72px]" />
                    <div className="pointer-events-none absolute -bottom-24 -right-10 w-56 h-56 rounded-full bg-accent-blue/18 blur-[70px]" />

                    <div className="relative h-20 px-5 flex items-center justify-between bg-white/[0.02]">
                        <div className="text-xl font-bold tracking-tight">
                            <span className="gradient-text">MG</span>
                            <span className="text-white/40 font-light ml-1">.</span>
                        </div>

                        <button
                            type="button"
                            onClick={() => setMobileOpen(false)}
                            className="h-10 w-10 inline-flex items-center justify-center rounded-xl bg-white/[0.05] text-text-secondary hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                            aria-label="Close menu"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="relative p-5">
                        <p className="text-[11px] text-text-muted uppercase tracking-[0.22em] mb-3 px-2">
                            {t("navbar.navigation")}
                        </p>

                        <div className="space-y-1.5 rounded-2xl bg-white/[0.02] p-2">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href.slice(1);
                                return (
                                    <a
                                        key={link.key}
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleClick(link.href);
                                        }}
                                        className={`flex items-center justify-between text-base font-medium py-3 px-3 rounded-xl transition-all duration-200 ${
                                            isActive
                                                ? "text-white bg-gradient-to-r from-accent-purple/35 to-accent-blue/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                                                : "text-text-secondary hover:text-white hover:bg-white/[0.06]"
                                        }`}
                                    >
                                        <span>{t(`navbar.links.${link.key}`)}</span>
                                        {isActive && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
                                        )}
                                    </a>
                                );
                            })}
                        </div>

                        <div className="mt-5 rounded-2xl bg-white/[0.03] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                            <p className="text-sm text-white font-medium">
                                {t("navbar.readyTitle")}
                            </p>
                            <p className="text-xs text-text-muted mt-1 leading-relaxed">
                                {t("navbar.readyText")}
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
}
