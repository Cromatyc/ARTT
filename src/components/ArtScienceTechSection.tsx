import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Microscope, Cpu } from "lucide-react";

const cards = [
  {
    icon: Palette,
    title: "Arte",
    text: "El componente artístico se evidencia en la construcción escultórica de la figura, la composición visual de la esfera y el uso simbólico de los elementos gráficos.",
  },
  {
    icon: Microscope,
    title: "Ciencia",
    text: "El componente científico aparece en la reflexión sobre el comportamiento humano, los hábitos de consumo digital, la atención y la manera en que los estímulos tecnológicos modifican nuestras relaciones sociales.",
  },
  {
    icon: Cpu,
    title: "Tecnología",
    text: "El componente tecnológico se expresa tanto en el tema de la obra como en los medios utilizados para desarrollarla: materiales, procesos de fabricación, intervención visual, modelado y presentación digital mediante una experiencia web interactiva.",
  },
];

export default function ArtScienceTechSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-28 md:py-40 px-6 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="block text-white/40 text-xs tracking-widest uppercase mb-6"
        >
          Arte · Ciencia · Tecnología
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif-r text-white text-4xl md:text-6xl tracking-tight leading-[1.05] max-w-3xl mb-16 md:mb-20"
        >
          Entre el cuerpo, el <span className="font-serif-it text-white/60">símbolo</span> y la técnica
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
                whileHover={{ y: -6 }}
                className="liquid-glass rounded-3xl p-8 hover:bg-white/5 transition-colors h-full"
              >
                <div className="liquid-glass rounded-full p-3 inline-flex mb-6">
                  <Icon size={22} className="text-white" />
                </div>
                <h4 className="font-serif-r text-white text-3xl md:text-4xl mb-4 tracking-tight">
                  {c.title}
                </h4>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  {c.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
