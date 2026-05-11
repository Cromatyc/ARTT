import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutArtworkSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="obra"
      className="relative pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />
      <div ref={ref} className="relative max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="block text-white/40 text-sm tracking-widest uppercase mb-8"
        >
          La obra
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif-r text-white text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl"
        >
          Atlas como <span className="font-serif-it text-white/60">símbolo</span>
        </motion.h2>

        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-10 md:gap-16 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-white/70 text-base md:text-lg leading-relaxed"
          >
            En la mitología griega, Atlas fue condenado a cargar el cielo o el mundo
            sobre sus hombros. Su imagen se ha convertido en un símbolo de resistencia,
            castigo, fuerza y peso permanente.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/70 text-base md:text-lg leading-relaxed"
          >
            Esta escultura retoma esa figura, pero la traslada al presente. El peso
            que sostiene ya no es únicamente físico: es mental, social y tecnológico.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
