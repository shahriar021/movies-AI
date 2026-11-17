import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectMovie } from "../../redux/slice/movieSlice";
import { Link } from "react-router-dom";
import VideoBackground from "./VideoBackground";
import WatchLaterButton from "../common/WatchLaterButton";
import { InfoIcon, PlayIcon, StarIcon } from "../common/Icons";

/** Big hero at the top of the browse page. */
const FirstContainer = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((s) => s.movies.lists.nowPlaying);

  // Pick one of the top 5 with a backdrop, stable for this visit
  const mainMovie = useMemo(() => {
    const pool = (movies ?? []).filter((m) => m.backdrop_path).slice(0, 5);
    return pool[Math.floor(Math.random() * pool.length)];
  }, [movies]);

  if (!mainMovie) {
    return <div className="h-[85vh] min-h-[520px] w-full animate-pulse bg-gradient-to-b from-ink-800 to-ink-950" />;
  }

  const title = mainMovie.title || mainMovie.original_title;
  const year = mainMovie.release_date?.slice(0, 4);

  return (
    <section className="relative h-[85vh] min-h-[520px] w-full overflow-hidden">
      <VideoBackground moviesID={mainMovie.id} backdropPath={mainMovie.backdrop_path} />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/30" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-40 sm:px-8 lg:px-12">
        <div className="max-w-2xl animate-fade-up">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" /> Now in theaters
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight drop-shadow-lg sm:text-6xl">
            {title}
          </h1>
          <div className="mt-3 flex items-center gap-3 text-sm font-medium text-white/70">
            {mainMovie.vote_average ? (
              <span className="inline-flex items-center gap-1 text-glow">
                <StarIcon className="h-4 w-4" /> {mainMovie.vote_average.toFixed(1)}
              </span>
            ) : null}
            {year && <span>{year}</span>}
          </div>
          <p className="mt-4 line-clamp-3 text-base text-white/80 sm:text-lg">{mainMovie.overview}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-ink-950 transition hover:bg-white/85 active:scale-[.98]"
              onClick={() => dispatch(selectMovie(mainMovie))}
            >
              <PlayIcon /> Play trailer
            </button>
            <Link to={`/movie/${mainMovie.id}`} className="btn-ghost">
              <InfoIcon /> More info
            </Link>
            <WatchLaterButton movie={mainMovie} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstContainer;
