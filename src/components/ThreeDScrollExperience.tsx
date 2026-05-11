import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, useGLTF } from "@react-three/drei";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import * as THREE from "three";

/**
 * Stylized 3D fallback: a slender humanoid silhouette holding a sphere overhead,
 * surrounded by floating digital tokens. Used when /models/atlas.glb is missing.
 */
function AtlasPlaceholder({ rotationY, sphereSpin }: { rotationY: MotionValue<number>; sphereSpin: boolean }) {
  const group = useRef<THREE.Group>(null);
  const sphere = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y = rotationY.get();
    if (sphereSpin && sphere.current) sphere.current.rotation.y += dt * 0.25;
  });

  const tokens = ["IA", "Redes", "Gaming", "Pantallas", "Consumo", "Datos", "Scroll", "Likes"];

  return (
    <group ref={group} position={[0, -1.2, 0]}>
      {/* Pedestal */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[1.1, 1.2, 0.1, 64]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.18, 0.6, 0]}>
        <capsuleGeometry args={[0.13, 1.05, 8, 16]} />
        <meshStandardMaterial color="#2a2522" metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0.18, 0.6, 0]}>
        <capsuleGeometry args={[0.13, 1.05, 8, 16]} />
        <meshStandardMaterial color="#2a2522" metalness={0.7} roughness={0.35} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 1.55, 0]}>
        <capsuleGeometry args={[0.28, 0.7, 8, 16]} />
        <meshStandardMaterial color="#3a302a" metalness={0.75} roughness={0.3} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color="#3a302a" metalness={0.75} roughness={0.3} />
      </mesh>

      {/* Arms raised */}
      <mesh position={[-0.45, 2.0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <capsuleGeometry args={[0.1, 0.9, 8, 16]} />
        <meshStandardMaterial color="#3a302a" metalness={0.75} roughness={0.3} />
      </mesh>
      <mesh position={[0.45, 2.0, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <capsuleGeometry args={[0.1, 0.9, 8, 16]} />
        <meshStandardMaterial color="#3a302a" metalness={0.75} roughness={0.3} />
      </mesh>

      {/* Sphere on top */}
      <group position={[0, 3.05, 0]}>
        <mesh ref={sphere}>
          <sphereGeometry args={[0.8, 64, 64]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.2} emissive="#0a0a0a" />
        </mesh>
        {/* Floating tokens around the sphere */}
        {tokens.map((t, i) => {
          const angle = (i / tokens.length) * Math.PI * 2;
          const r = 1.15;
          return (
            <Float key={t} speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
              <Text
                position={[Math.cos(angle) * r, Math.sin(angle * 0.5) * 0.25, Math.sin(angle) * r]}
                fontSize={0.14}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
              >
                {t}
              </Text>
            </Float>
          );
        })}
      </group>
    </group>
  );
}

function GLBAtlas({ rotationY }: { rotationY: MotionValue<number> }) {
  // Will throw to Suspense fallback if not found
  const { scene } = useGLTF("/models/atlas.glb");
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.y = rotationY.get();
  });
  return (
    <group ref={ref} position={[0, -1.2, 0]}>
      <primitive object={scene} />
    </group>
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

export default function ThreeDScrollExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOk, setVideoOk] = useState<boolean | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Scroll-driven rotation for 3D fallback (0 -> 180°)
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI]);

  // Smooth scroll-scrub: rAF loop lerps current toward target so seeks are
  // batched once per animation frame and feel fluid even with sparse keyframes.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    let target = scrollYProgress.get();
    let current = target;
    let rafId = 0;
    let lastApplied = -1;
    let unlocked = false;

    // iOS/Android require a user gesture before a paused <video> will
    // actually render new frames on currentTime changes. We "unlock" it
    // by calling play() then pausing immediately on first touch/click.
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      const p = video.play();
      if (p && typeof p.then === "function") {
        p.then(() => video.pause()).catch(() => {});
      } else {
        try { video.pause(); } catch { /* noop */ }
      }
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("touchend", unlock);
      window.removeEventListener("click", unlock);
      window.removeEventListener("scroll", unlock);
    };
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("touchend", unlock, { passive: true });
    window.addEventListener("click", unlock);
    window.addEventListener("scroll", unlock, { passive: true });
    // Try once eagerly (desktop / autoplay-allowed browsers).
    unlock();

    const ensurePaused = () => {
      if (!video.paused) video.pause();
    };
    video.addEventListener("loadedmetadata", ensurePaused);

    const unsubscribe = scrollYProgress.on("change", (v) => {
      target = v;
    });

    const tick = () => {
      current += (target - current) * 0.18;
      const duration = video.duration;
      if (duration && isFinite(duration)) {
        const t = Math.max(0, Math.min(1, current)) * duration;
        const delta = Math.abs(t - lastApplied);
        // On mobile, only seek when the delta is larger (avoid flooding the
        // decoder which mobile browsers throttle aggressively).
        const threshold = isMobile ? 1 / 30 : 1 / 60;
        if (delta > threshold) {
          try {
            video.currentTime = t;
            lastApplied = t;
            // iOS Safari trick: a momentary play()/pause() forces the
            // freshly-seeked frame to actually paint to the screen.
            if (isMobile && unlocked) {
              const p = video.play();
              if (p && typeof p.then === "function") {
                p.then(() => video.pause()).catch(() => {});
              }
            }
          } catch {
            /* ignore seek-in-progress race */
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      unsubscribe();
      video.removeEventListener("loadedmetadata", ensurePaused);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("touchend", unlock);
      window.removeEventListener("click", unlock);
      window.removeEventListener("scroll", unlock);
    };
  }, [scrollYProgress]);

  // Detect whether the video can load
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onMeta = () => setVideoOk(true);
    const onError = () => setVideoOk(false);
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("error", onError);
    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("error", onError);
    };
  }, []);

  return (
    <section
      id="three-d"
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Scroll-driven video — object-contain so the full figure (head to feet) stays in frame */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-contain"
          src="/videos/atlas-180-transition.mp4"
          muted
          playsInline
          // @ts-expect-error legacy iOS attribute
          webkit-playsinline="true"
          preload="auto"
          disablePictureInPicture
        />

        {/* 3D fallback if video can't load */}
        {videoOk === false && (
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 1.4, 5.5], fov: 35 }} dpr={[1, 2]}>
              <color attach="background" args={["#000"]} />
              <ambientLight intensity={0.35} />
              <directionalLight position={[3, 6, 4]} intensity={1.2} />
              <directionalLight position={[-4, 2, -3]} intensity={0.35} color="#88aaff" />
              <Suspense fallback={<AtlasPlaceholder rotationY={rotationY} sphereSpin />}>
                <GLBAtlas rotationY={rotationY} />
              </Suspense>
            </Canvas>
          </div>
        )}

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

        {/* Progress hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-[0.3em] uppercase">
          Desplázate para rodear a Atlas
        </div>
      </div>
    </section>
  );
}

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

useGLTF.preload?.("/models/atlas.glb");
