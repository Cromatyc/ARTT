import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    n: "01",
    title: "Inspiración",
    text: "Se toma como punto de partida la figura de Atlas y su carga simbólica.",
  },
  {
    n: "02",
    title: "Reinterpretación",
    text: "El mundo clásico se transforma en una esfera contemporánea llena de símbolos digitales.",
  },
  {
    n: "03",
    title: "Construcción",
    text: "La escultura se desarrolla mediante procesos manuales, materiales físicos e intervención visual.",
  },
  {
    n: "04",
    title: "Experiencia digital",
    text: "La obra se expande a una página web con animación 3D, scroll narrativo y lectura interactiva.",
  },
];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="proceso"
      className="relative py-28 md:py-40 px-6 overflow-hidden"
    >
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="block text-white/40 text-xs tracking-widest uppercase mb-6"
        >
          Proceso de creación
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif-r text-white text-4xl md:text-6xl tracking-tight leading-[1.05] mb-16 md:mb-20 max-w-3xl"
        >
          Del mito al <span className="font-serif-it text-white/60">presente</span>
        </motion.h3>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-px" />
          <ul className="space-y-12 md:space-y-20">
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.12 }}
                className={`relative grid md:grid-cols-2 gap-8 items-start ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="md:pr-12 md:text-right relative pl-14 md:pl-0">
                  <span className="absolute left-0 md:left-auto md:right-[-13px] top-1 w-6 h-6 rounded-full liquid-glass flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-white/80" />
                  </span>
                  <span className="block text-white/40 text-xs tracking-[0.3em] uppercase mb-3">
                    {s.n}
                  </span>
                  <h4 className="font-serif-r text-white text-3xl md:text-4xl tracking-tight">
                    {s.title}
                  </h4>
                </div>
                <div className="md:pl-12 pl-14">
                  <p className="text-white/65 text-base md:text-lg leading-relaxed">
                    {s.text}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
