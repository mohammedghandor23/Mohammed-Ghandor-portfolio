import { motion } from "framer-motion";

const blobs = [
    {
        id: "purple",
        className:
            "-top-40 -left-32 w-[460px] h-[460px] md:w-[620px] md:h-[620px]",
        color: "rgba(124, 58, 237, 0.34)",
        duration: 28,
        x: 42,
        y: 30,
    },
    {
        id: "blue",
        className:
            "top-[14%] -right-36 w-[420px] h-[420px] md:w-[560px] md:h-[560px]",
        color: "rgba(59, 130, 246, 0.28)",
        duration: 24,
        x: -38,
        y: 26,
    },
    {
        id: "cyan",
        className:
            "bottom-[-180px] left-[18%] w-[360px] h-[360px] md:w-[520px] md:h-[520px]",
        color: "rgba(6, 182, 212, 0.2)",
        duration: 30,
        x: 26,
        y: -34,
    },
    {
        id: "violet",
        className:
            "bottom-[10%] -right-20 w-[260px] h-[260px] md:w-[360px] md:h-[360px]",
        color: "rgba(139, 92, 246, 0.22)",
        duration: 22,
        x: -20,
        y: -24,
    },
];

export default function AmbientBackground() {
    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        >
            <div className="absolute inset-0 bg-primary" />

            <div
                className="absolute inset-0 opacity-75"
                style={{
                    background:
                        "radial-gradient(circle at 14% 18%, rgba(124,58,237,0.28), transparent 44%), radial-gradient(circle at 78% 12%, rgba(59,130,246,0.26), transparent 40%), radial-gradient(circle at 50% 75%, rgba(6,182,212,0.16), transparent 46%)",
                }}
            />

            <div className="absolute inset-0 opacity-[0.16] bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:74px_74px]" />

            {blobs.map((blob) => (
                <motion.div
                    key={blob.id}
                    className={`absolute rounded-full blur-[130px] ${blob.className}`}
                    style={{ background: blob.color }}
                    animate={{
                        x: [0, blob.x, -blob.x * 0.5, 0],
                        y: [0, blob.y, -blob.y * 0.4, 0],
                        scale: [1, 1.08, 0.96, 1],
                    }}
                    transition={{
                        duration: blob.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,15,15,0)_34%,rgba(15,15,15,0.8)_100%)]" />
        </div>
    );
}
