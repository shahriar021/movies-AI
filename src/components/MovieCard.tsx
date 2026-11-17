import React from "react";
import { Link } from "react-router-dom";
import { image_url } from "../utils/constant";
import type { Movie } from "../utils/tmdb";
import { StarIcon } from "../ui/common/Icons";
import WatchLaterButton from "../ui/common/WatchLaterButton";

type Props = {
  movie: Movie;
  rank?: number;
  fluid?: boolean; // fill the grid cell instead of a fixed width
  onRemove?: () => void; // shows an ✕ (used in Recently viewed)
};

/** Poster that opens the movie page; hover shows rating + Watch later. */
export default function MovieCard({ movie, rank, fluid = false, onRemove }: Props) {
  const title = movie.title || movie.original_title;

  return (
    <div className={`group relative flex shrink-0 snap-start items-end ${fluid ? "w-full" : ""}`}>
      {rank && (
        <span
          className="-mr-4 select-none font-display text-[7rem] font-extrabold leading-none text-transparent sm:text-[8.5rem]"
          style={{ WebkitTextStroke: "2px rgba(255,255,255,.35)" }}
        >
          {rank}
        </span>
      )}
      <div
        className={`relative overflow-hidden rounded-xl bg-ink-800 shadow-lg ring-1 ring-white/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-brand-500/20 group-hover:ring-white/20 ${
          fluid ? "w-full" : "w-36 sm:w-44"
        }`}
      >
        <Link to={`/movie/${movie.id}`} aria-label={title} className="block">
          {movie.poster_path ? (
            <img
              src={image_url + movie.poster_path}
              alt={title}
              loading="lazy"
              className="aspect-[2/3] w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="grid aspect-[2/3] w-full place-items-center bg-gradient-to-br from-ink-700 to-ink-900 p-3 text-center text-sm font-semibold text-white/60">
              {title}
            </div>
          )}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/30 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="line-clamp-2 text-sm font-semibold">{title}</p>
            <div className="mt-1 flex items-center gap-2 text-xs text-white/70">
              {movie.vote_average ? (
                <span className="inline-flex items-center gap-1 text-glow">
                  <StarIcon className="h-3 w-3" />
                  {movie.vote_average.toFixed(1)}
                </span>
              ) : null}
              <span>{movie.release_date?.slice(0, 4)}</span>
            </div>
          </div>
        </Link>

        {/* actions sit outside the link so they don't navigate */}
        <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity duration-300 focus-within:opacity-100 group-hover:opacity-100">
          <WatchLaterButton movie={movie} compact />
          {onRemove && (
            <button
              onClick={onRemove}
              aria-label="Remove from Recently viewed"
              title="Remove from Recently viewed"
              className="grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur transition hover:bg-white hover:text-ink-950"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
