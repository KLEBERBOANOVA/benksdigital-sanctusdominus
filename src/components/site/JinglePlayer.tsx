import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipForward, Volume2, VolumeX, Music2 } from "lucide-react";
import jingle01 from "@/assets/jingle-sanctus-dominus-01.mp3.asset.json";

type Track = { src: string; title: string };

const TRACKS: Track[] = [
  { src: jingle01.url, title: "Sanctus Dominus — Jingle Oficial" },
];

export function JinglePlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  // Start muted so the browser allows autoplay; we unmute on the first user gesture.
  const [muted, setMuted] = useState(true);
  const userUnmutedRef = useRef(false);
  const current = TRACKS[index];

  // Load track + try to start playback (muted on first load so autoplay is allowed).
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = current.src;
    audio.load();
    const tryPlay = () => audio.play().catch(() => setPlaying(false));
    tryPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Keep audio element muted state in sync.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
  }, [muted]);

  // First user gesture anywhere on the page → unmute + ensure playback.
  useEffect(() => {
    const onFirstGesture = () => {
      if (userUnmutedRef.current) return;
      userUnmutedRef.current = true;
      const audio = audioRef.current;
      if (!audio) return;
      audio.muted = false;
      setMuted(false);
      audio.play().then(() => setPlaying(true)).catch(() => {});
      cleanup();
    };
    const events: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "touchstart", "scroll"];
    const cleanup = () => events.forEach((e) => window.removeEventListener(e, onFirstGesture));
    events.forEach((e) => window.addEventListener(e, onFirstGesture, { once: true, passive: true }));
    return cleanup;
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.muted = false;
      setMuted(false);
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const next = () => setIndex((i) => (i + 1) % TRACKS.length);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-9 bg-navy-deep text-cream border-b border-gold/30 shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center gap-3 px-3 sm:px-5 lg:px-8">
        <Music2 className="h-3.5 w-3.5 text-gold shrink-0" aria-hidden />
        <p className="hidden sm:block text-[11px] uppercase tracking-[0.25em] text-gold/90 shrink-0">
          Jingle
        </p>
        <p className="flex-1 truncate text-[12px] text-cream/90 italic">
          {current.title}
        </p>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pausar jingle" : "Tocar jingle"}
            className="grid h-7 w-7 place-items-center rounded-full bg-gold text-navy-deep hover:scale-105 transition-transform"
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 translate-x-[1px]" />}
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Próximo jingle"
            className="grid h-7 w-7 place-items-center rounded-full text-cream/80 hover:text-gold hover:bg-cream/10 transition-colors"
          >
            <SkipForward className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              userUnmutedRef.current = true;
              setMuted((m) => !m);
            }}
            aria-label={muted ? "Ativar som" : "Silenciar"}
            className="grid h-7 w-7 place-items-center rounded-full text-cream/80 hover:text-gold hover:bg-cream/10 transition-colors"
          >
            {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
      <audio
        ref={audioRef}
        muted
        autoPlay
        preload="auto"
        onEnded={next}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
    </div>
  );
}
