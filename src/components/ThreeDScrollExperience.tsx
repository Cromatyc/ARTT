import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/**
 * Frame-by-frame scroll scrubber.
 *
 * Instead of relying on `<video>` + `currentTime` (which is unreliable across
 * mobile browsers — iOS Safari and Android Chrome throttle or block seeks on
 * paused video), we decode the 180° camera move into a sequence of JPGs at
 * build time and paint the right frame to a <canvas> as the user scrolls.
 *
 * This is the same technique Apple uses on its product pages.
 */
const FRAME_COUNT = 122;
const FRAME_URL = (i: number) =>
  `/frames/f_${String(i).padStart(3, "0")}.jpg`;

export default function ThreeDScrollExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Preload all frames. Critical frames (every 8th) first so the page becomes
  // interactive quickly; the rest stream in and fill the gaps progressively.
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let done = 0;

    const loadOne = (idx: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.src = FRAME_URL(idx + 1);
        img.onload = img.onerror = () => {
          if (cancelled) return resolve();
          images[idx] = img;
          done += 1;
          setLoaded(done);
          // First frame ready → render immediately so user sees something.
          if (idx === 0) {
            framesRef.current = images;
            setReady(true);
            drawFrame(0);
          }
          resolve();
        };
      });

    // Two-phase preload: priority frames first, then the rest.
    const priority: number[] = [];
    const rest: number[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      (i % 8 === 0 ? priority : rest).push(i);
    }

    (async () => {
      for (const i of priority) {
        if (cancelled) return;
        await loadOne(i);
      }
      framesRef.current = images;
      setReady(true);
      // Remaining frames load in parallel batches.
      const batchSize = 6;
      for (let i = 0; i < rest.length; i += batchSize) {
        if (cancelled) return;
        await Promise.all(rest.slice(i, i + batchSize).map(loadOne));
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawFrame = (idx: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames.length) return;

    // Find nearest available frame (in case some haven't loaded yet)
    let i = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(idx)));
    let img = frames[i];
    if (!img) {
      // Search outward for the closest loaded frame
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (frames[i - d]) { img = frames[i - d]; break; }
        if (frames[i + d]) { img = frames[i + d]; break; }
      }
    }
    if (!img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas backing store to match its CSS size (DPR aware)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const needResize =
      canvas.width !== Math.round(w * dpr) ||
      canvas.height !== Math.round(h * dpr);
    if (needResize) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // object-contain: fit the image inside the canvas, preserving aspect ratio
    const cw = canvas.width;
    const ch = canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw, dh;
    if (ir > cr) {
      dw = cw;
      dh = cw / ir;
    } else {
      dh = ch;
      dw = ch * ir;
    }
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  // Smooth scroll-driven scrub: rAF lerp from current toward scroll target.
  useEffect(() => {
    if (!ready) return;
    let target = scrollYProgress.get() * (FRAME_COUNT - 1);
    let current = target;
    let raf = 0;

    const unsub = scrollYProgress.on("change", (p) => {
      target = p * (FRAME_COUNT - 1);
    });

    const tick = () => {
      current += (target - current) * 0.2;
      drawFrame(current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => drawFrame(current);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      unsub();
      window.removeEventListener("resize", onResize);
    };
  }, [ready, scrollYProgress]);

  // Map scroll → frame index for the "frame counter" UI
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

  return (
    <section
      id="three-d"
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Cinematic vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.85)_100%)] pointer-events-none" />

        {/* Floating editorial texts */}
        {scrollTexts.map((t, i) => (
          <FloatingScrollText
            key={i}
            index={i}
            progress={scrollYProgress}
            range={t.range as [number, number]}
            text={t.text}
            italic={t.italic}
          />
        ))}

        {/* Loading indicator (subtle, top-right) */}
        {loaded < FRAME_COUNT && (
          <div className="absolute top-6 right-6 text-white/40 text-[10px] tracking-[0.3em] uppercase">
            Cargando · {Math.round((loaded / FRAME_COUNT) * 100)}%
          </div>
        )}

        {/* Progress hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-[0.3em] uppercase">
          Desplázate para rodear a Atlas
        </div>

        {/* Frame counter (editorial detail) */}
        <motion.div className="absolute bottom-8 right-6 font-serif-it text-white/40 text-xs">
          <motion.span>{frameIndex}</motion.span>
          <span className="ml-1">/ {FRAME_COUNT}</span>
        </motion.div>
      </div>
    </section>
  );
}

const scrollTexts = [
  { range: [0.0, 0.16], text: "La figura aparece en silencio.", italic: true },
  { range: [0.16, 0.32], text: "La cámara rodea el peso.", italic: false },
  { range: [0.32, 0.48], text: "Los símbolos digitales se revelan.", italic: true },
  { range: [0.48, 0.64], text: "El rostro desaparece.", italic: false },
  { range: [0.64, 0.82], text: "El peso deja de ser físico.", italic: true },
  { range: [0.82, 1.0], text: "Atlas somos nosotros.", italic: true },
];

function FloatingScrollText({
  index,
  progress,
  range,
  text,
  italic,
}: {
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  text: string;
  italic: boolean;
}) {
  const [start, end] = range;
  const mid = (start + end) / 2;
  const opacity = useTransform(progress, [start, mid - 0.02, mid + 0.02, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end], [30, -30]);

  const side = index % 2 === 0 ? "left" : "right";

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute top-1/2 -translate-y-1/2 max-w-sm px-8 ${
        side === "left" ? "left-4 md:left-16 text-left" : "right-4 md:right-16 text-right"
      }`}
    >
      <p
        className={`text-white/85 text-2xl md:text-4xl leading-tight ${
          italic ? "font-serif-it" : "font-serif-r"
        }`}
      >
        {text}
      </p>
      <span className="block mt-3 text-white/30 text-[10px] tracking-[0.4em] uppercase">
        {`0${index + 1} / 06`}
      </span>
    </motion.div>
  );
}
