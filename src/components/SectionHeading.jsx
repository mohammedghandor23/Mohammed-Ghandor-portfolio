import { motion } from 'framer-motion'

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function SectionHeading({ title, subtitle }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="text-center mb-16"
    >
      <motion.h2
        variants={item}
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={item}
          className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto font-light"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
          },
        }}
        className="heading-line mt-6 mx-auto w-20 h-1 bg-gradient-accent rounded-full shadow-[0_0_16px_rgba(124,58,237,0.55)]"
      />
    </motion.div>
  )
}
