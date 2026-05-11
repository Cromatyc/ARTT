import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ManifestoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_transparent_60%)]" />
      <div ref={ref} className="relative max-w-5xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="block text-white/40 text-xs tracking-[0.4em] uppercase mb-8"
        >
          Manifiesto
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif-r text-white text-4xl md:text-6xl tracking-tight leading-[1.05] mb-10"
        >
          No todo avance es <span className="font-serif-it text-white/60">liberación</span>
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/65 text-base md:text-lg leading-relaxed max-w-3xl mx-auto space-y-5"
        >
          <p>
            La obra no rechaza la tecnología. Al contrario, reconoce que la tecnología
            hace parte del progreso humano, de la creatividad y de la comunicación
            contemporánea.
          </p>
          <p>Sin embargo, plantea una pregunta crítica:</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.35 }}
          className="font-serif-it text-white text-5xl md:text-7xl leading-[1.05] tracking-tight mt-16 mb-14 max-w-4xl mx-auto"
        >
          ¿Estamos usando la tecnología o estamos siendo sostenidos por ella?
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="liquid-glass rounded-full px-10 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors"
        >
          Reflexionar
        </motion.button>
      </div>
    </section>
  );
}
