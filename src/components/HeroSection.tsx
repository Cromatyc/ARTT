import { Globe, Instagram, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col bg-black">
      {/* Background image — cinematic Atlas in cosmos */}
      <motion.img
        src="/images/1.png"
        alt="Atlas cargando una esfera con grietas doradas en el cosmos"
        className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        draggable={false}
      />
      {/* Cinematic vignette + bottom fade for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/90 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.7)_100%)] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-20 px-6 py-6">
        <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe size={22} className="text-white" />
            <span className="text-white font-semibold text-lg tracking-wide">Atlas</span>
            <ul className="hidden md:flex items-center gap-8 ml-8 text-sm text-white/80">
              <li><a href="#obra" className="hover:text-white">La obra</a></li>
              <li><a href="#concepto" className="hover:text-white">Concepto</a></li>
              <li><a href="#proceso" className="hover:text-white">Proceso</a></li>
              <li><a href="#autores" className="hover:text-white">Autores</a></li>
            </ul>
          </div>
          <div className="flex items-center gap-3">
            <a href="#concepto" className="hidden sm:inline text-white/80 hover:text-white text-sm font-medium">Explorar</a>
            <a href="#three-d" className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium">Ver 3D</a>
          </div>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%]">
        <h1 className="font-serif-r text-white text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.95] max-w-6xl">
          El peso de la <span className="font-serif-it text-white/70">modernidad</span>
        </h1>
        <p
          className="mt-6 text-white text-lg md:text-2xl max-w-2xl font-medium"
          style={{ textShadow: "0 2px 18px rgba(0,0,0,0.85)" }}
        >
          Una reinterpretación contemporánea del mito de Atlas
        </p>
        <p
          className="mt-6 text-white text-base md:text-xl max-w-2xl leading-relaxed"
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.9)" }}
        >
          Atlas ya no sostiene únicamente el mundo. En esta obra carga una esfera atravesada
          por símbolos de la vida actual: tecnología, redes sociales, entretenimiento
          digital e inteligencia artificial.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#obra" className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors">
            Explorar la obra
          </a>
          <a href="#three-d" className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors">
            Ver experiencia 3D
          </a>
        </div>
      </div>

      {/* Footer social icons */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        {[Instagram, Globe, ArrowUpRight].map((Icon, i) => (
          <button
            key={i}
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
            aria-label="link"
          >
            <Icon size={20} />
          </button>
        ))}
      </div>
    </section>
  );
}
