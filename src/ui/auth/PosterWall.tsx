import React, { useEffect, useState } from "react";
import { fetchMovieList, hasTmdbToken } from "../../utils/tmdb";
import { image_url } from "../../utils/constant";

const fallbackTiles = [
  "from-rose-500 to-orange-400",
  "from-violet-600 to-fuchsia-500",
  "from-sky-500 to-indigo-600",
  "from-emerald-500 to-teal-700",
  "from-amber-400 to-red-500",
  "from-pink-500 to-purple-700",
];

/** Endless, slowly scrolling columns of movie posters behind the auth card. */
const PosterWall = () => {
  const [posters, setPosters] = useState<string[]>([]);

  useEffect(() => {
    if (!hasTmdbToken()) return;
    let alive = true;
    Promise.all([fetchMovieList("/movie/popular"), fetchMovieList("/movie/top_rated")])
      .then(([a, b]) => {
        if (!alive) return;
        const paths = [...a, ...b]
          .map((m) => m.poster_path)
          .filter((p): p is string => Boolean(p));
        setPosters(paths);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const columns = [0, 1, 2, 3];
  const perColumn = 8;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 flex -rotate-6 scale-125 gap-4 opacity-60">
        {columns.map((col) => {
          const items = Array.from({ length: perColumn }, (_, i) =>
            posters.length ? posters[(col * perColumn + i) % posters.length] : null
          );
          const loop = [...items, ...items]; // duplicated so the scroll is seamless
          return (
            <div
              key={col}
              className={`flex flex-1 flex-col gap-4 ${
                col % 2 ? "animate-scroll-down" : "animate-scroll-up"
              }`}
            >
              {loop.map((p, i) =>
                p ? (
                  <img
                    key={i}
                    src={image_url + p}
                    alt=""
                    loading="lazy"
                    className="aspect-[2/3] w-full rounded-2xl object-cover"
                  />
                ) : (
                  <div
                    key={i}
                    className={`aspect-[2/3] w-full rounded-2xl bg-gradient-to-br ${
                      fallbackTiles[(col + i) % fallbackTiles.length]
                    } opacity-40`}
                  />
                )
              )}
            </div>
          );
        })}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/40 via-ink-950/70 to-ink-950" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/60" />
    </div>
  );
};

export default PosterWall;
