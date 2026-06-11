import { motion } from 'framer-motion'

export default function SectionHeading({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto font-light">
          {subtitle}
        </p>
      )}
      <div className="mt-6 mx-auto w-20 h-1 bg-gradient-accent rounded-full" />
    </motion.div>
  )
}
