import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const data: [string, string][] = [
  ["Título de la obra", "El peso de la modernidad"],
  ["Inspiración", "Atlas, figura de la mitología griega"],
  ["Tipo de obra", "Escultura conceptual"],
  ["Tema", "Tecnología, dependencia digital e identidad contemporánea"],
  ["Lenguaje visual", "Figura humana, esfera simbólica e intervención gráfica"],
  ["Autores", "Santiago Alejandro Daza Reyes · Sofía Galindo Barranco · Juan José Franco Arcila"],
  ["Materia", "Arte"],
];

export default function TechnicalSheetSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="autores"
      className="relative py-28 md:py-40 px-6 overflow-hidden"
    >
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="liquid-glass rounded-3xl p-8 md:p-12"
        >
          <span className="block text-white/40 text-xs tracking-widest uppercase mb-4">
            Ficha técnica
          </span>
          <h3 className="font-serif-r text-white text-4xl md:text-5xl tracking-tight mb-10">
            El peso de la <span className="font-serif-it text-white/60">modernidad</span>
          </h3>
          <dl className="divide-y divide-white/10">
            {data.map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-4"
              >
                <dt className="text-white/40 text-xs tracking-widest uppercase">{k}</dt>
                <dd className="sm:col-span-2 text-white/85 text-sm md:text-base leading-relaxed">
                  {v}
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
