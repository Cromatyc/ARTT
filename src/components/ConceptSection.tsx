import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EyeOff, Smartphone, UserMinus } from "lucide-react";

const ideas = [
  {
    icon: EyeOff,
    title: "Carga invisible",
    desc: "Lo que sostenemos no se ve, pero pesa. Notificaciones, expectativas, atención fragmentada.",
  },
  {
    icon: Smartphone,
    title: "Dependencia digital",
    desc: "Vivir sintonizados con pantallas, algoritmos y estímulos que dictan el ritmo del día.",
  },
  {
    icon: UserMinus,
    title: "Pérdida de identidad",
    desc: "Cuando lo que somos empieza a definirse por lo que consumimos y mostramos en redes.",
  },
];

export default function ConceptSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="concepto"
      className="relative py-28 md:py-40 px-6 overflow-hidden"
    >
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="rounded-3xl overflow-hidden aspect-[4/5] liquid-glass relative"
          >
            <img
              src="/images/2.png"
              alt="Estatua de mármol de Atlas sosteniendo una esfera fracturada con vetas doradas"
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <span className="block text-white/40 text-xs tracking-widest uppercase mb-5">
              Concepto artístico
            </span>
            <h3 className="font-serif-r text-white text-4xl md:text-6xl tracking-tight leading-[1.05] mb-8">
              El peso de la <span className="font-serif-it text-white/60">modernidad</span>
            </h3>
            <div className="space-y-5 text-white/70 text-base md:text-lg leading-relaxed">
              <p>
                La escultura busca expresar cómo la sociedad actual convive con una
                carga silenciosa: la necesidad constante de estar conectados, consumir
                contenido, responder estímulos y pertenecer a dinámicas digitales.
              </p>
              <p>
                La esfera representa el mundo moderno, pero no desde una visión geográfica,
                sino simbólica. Es un mundo compuesto por pantallas, aplicaciones, videojuegos,
                redes sociales, inteligencia artificial y entretenimiento permanente.
              </p>
              <p>
                Atlas sostiene esa esfera como una metáfora de nuestra época: una humanidad
                avanzada tecnológicamente, pero cada vez más expuesta a la saturación, la
                dependencia y la pérdida de identidad propia.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Three idea cards */}
        <div className="mt-20 md:mt-28 grid md:grid-cols-3 gap-6">
          {ideas.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
                whileHover={{ y: -4 }}
                className="liquid-glass rounded-3xl p-7 md:p-8 hover:bg-white/5 transition-colors"
              >
                <div className="liquid-glass rounded-full p-3 inline-flex mb-5">
                  <Icon size={20} className="text-white" />
                </div>
                <h4 className="font-serif-r text-white text-2xl md:text-3xl mb-3 tracking-tight">
                  {it.title}
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">{it.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
