import { useEffect, useRef } from "react";
import Hls from "hls.js";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

/**
 * Fixed full-viewport ambient background. Lives behind every section
 * (z-index 0) so the page no longer feels uniformly black between sections.
 * A dark overlay keeps content legible.
 */
export default function GlobalBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
      video.play().catch(() => {});
      return;
    }
    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true, lowLatencyMode: false });
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      return () => hls.destroy();
    }
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      <video
        ref={videoRef}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark veil keeps text readable across all sections */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.65)_100%)]" />
    </div>
  );
}
