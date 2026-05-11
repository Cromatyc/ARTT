import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FinalSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
      <div ref={ref} className="relative max-w-5xl mx-auto py-32">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="block text-white/40 text-xs md:text-sm tracking-[0.4em] uppercase mb-10"
        >
          Una escultura sobre lo que cargamos sin darnos cuenta
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-serif-it text-white text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.02]"
        >
          ¿Qué parte de ese peso también cargas tú?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-12 text-white/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
        >
          El peso de la modernidad es una invitación a mirar de frente aquello que se
          ha vuelto cotidiano. La obra plantea que el mundo actual no solo se sostiene
          sobre avances tecnológicos, sino también sobre nuevas formas de dependencia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Volver al inicio
          </a>
          <a
            href="#proceso"
            className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Ver proceso
          </a>
        </motion.div>

        <div className="mt-24 text-white/30 text-xs tracking-[0.3em] uppercase">
          © Atlas — El peso de la modernidad
        </div>
      </div>
    </section>
  );
}
