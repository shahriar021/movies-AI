import React, { useEffect, useState } from "react";
import { useTrailer } from "../../hooks/useTrailer";
import { backdrop_url } from "../../utils/constant";

/**
 * Backdrop image first, then the muted trailer fades in on top of it.
 * Pass `trailerKey` if you already have it (skips an extra request).
 */
export default function VideoBackground({
  moviesID,
  backdropPath,
  trailerKey: knownKey,
}: {
  moviesID: number;
  backdropPath?: string | null;
  trailerKey?: string | null;
}) {
  const fetchedKey = useTrailer(knownKey === undefined ? moviesID : undefined);
  const trailerKey = knownKey === undefined ? fetchedKey : knownKey;
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(false), [trailerKey]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink-950">
      {backdropPath && (
        <img
          key={backdropPath}
          src={backdrop_url + backdropPath}
          alt=""
          className="absolute inset-0 h-full w-full object-cover animate-[fade-up_.8s_ease-out_both]"
        />
      )}
      {trailerKey && (
        <iframe
          key={trailerKey}
          onLoad={() => setTimeout(() => setReady(true), 1200)}
          className={`pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-screen min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 scale-[1.15] transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&modestbranding=1&rel=0&playsinline=1`}
          title="Trailer"
          allow="autoplay; encrypted-media; picture-in-picture"
        />
      )}
    </div>
  );
}
