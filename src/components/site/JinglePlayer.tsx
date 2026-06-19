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
  const [muted, setMuted] = useState(false);
  const current = TRACKS[index];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = current.src;
    audio.load();
    audio.play().catch(() => {
      // Browser blocked unmuted autoplay — retry muted so playback still starts.
      audio.muted = true;
      setMuted(true);
      audio.play().catch(() => setPlaying(false));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
  }, [muted]);


  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
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
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Ativar som" : "Silenciar"}
            className="grid h-7 w-7 place-items-center rounded-full text-cream/80 hover:text-gold hover:bg-cream/10 transition-colors"
          >
            {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={next}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
    </div>
  );
}
