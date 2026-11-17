import React, { useRef } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import type { Movie } from "../utils/tmdb";
import { ChevronIcon } from "../ui/common/Icons";

type Props = {
  title: string;
  movies?: Movie[];
  ranked?: boolean; // show big 1–10 numbers
  badge?: string;
  icon?: React.ReactNode;
  seeAllTo?: string;
  onRemove?: (movie: Movie) => void;
};

const MovieList = ({ title, movies, ranked, badge, icon, seeAllTo, onRemove }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) =>
    rowRef.current?.scrollBy({ left: dir * rowRef.current.clientWidth * 0.85, behavior: "smooth" });

  const items = ranked ? movies?.slice(0, 10) : movies;

  return (
    <section className="group/row relative py-4">
      <div className="mx-auto mb-3 flex max-w-[1600px] items-center gap-3 px-4 sm:px-8 lg:px-12">
        {icon && <span className="text-brand-400">{icon}</span>}
        <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
        {badge && (
          <span className="rounded-full bg-gradient-to-r from-brand-500 to-glow px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider">
            {badge}
          </span>
        )}
        {seeAllTo && (
          <Link
            to={seeAllTo}
            className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-white/50 transition hover:text-white"
          >
            See all <ChevronIcon className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="relative mx-auto max-w-[1600px]">
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className="absolute inset-y-0 left-0 z-10 hidden w-12 items-center justify-center bg-gradient-to-r from-ink-950 to-transparent opacity-0 transition group-hover/row:opacity-100 md:flex"
        >
          <ChevronIcon dir="left" className="h-8 w-8" />
        </button>
        <div
          ref={rowRef}
          className="no-scrollbar flex snap-x gap-3 overflow-x-auto scroll-smooth px-4 py-2 sm:gap-4 sm:px-8 lg:px-12"
        >
          {items
            ? items.map((movie, i) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  rank={ranked ? i + 1 : undefined}
                  onRemove={onRemove ? () => onRemove(movie) : undefined}
                />
              ))
            : Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="relative aspect-[2/3] w-36 shrink-0 overflow-hidden rounded-xl bg-ink-800 sm:w-44"
                >
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </div>
              ))}
        </div>
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className="absolute inset-y-0 right-0 z-10 hidden w-12 items-center justify-center bg-gradient-to-l from-ink-950 to-transparent opacity-0 transition group-hover/row:opacity-100 md:flex"
        >
          <ChevronIcon className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
};

export default MovieList;
