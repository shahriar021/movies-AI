import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectMovie } from "../../redux/slice/movieSlice";
import { useTrailer } from "../../hooks/useTrailer";
import { backdrop_url } from "../../utils/constant";
import WatchLaterButton from "../common/WatchLaterButton";
import { CloseIcon, InfoIcon, StarIcon } from "../common/Icons";

/** Trailer player with sound, for whichever movie is selected anywhere in the app. */
const MovieModal = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const movie = useAppSelector((s) => s.movies.selected);
  const trailerKey = useTrailer(movie?.id);
  const close = () => dispatch(selectMovie(null));

  useEffect(() => {
    if (!movie) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dispatch(selectMovie(null));
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [movie, dispatch]);

  if (!movie) return null;
  const title = movie.title || movie.original_title;
  const onDetailsPage = pathname === `/movie/${movie.id}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm sm:items-center"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-8 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-2xl animate-pop-in"
      >
        <button
          onClick={close}
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/60 backdrop-blur transition hover:bg-black/80"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <div className="relative aspect-video w-full bg-black">
          {trailerKey ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
              title={`${title} trailer`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : movie.backdrop_path ? (
            <img src={backdrop_url + movie.backdrop_path} alt="" className="h-full w-full object-cover" />
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-4 p-5 sm:p-6">
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-display text-2xl font-bold">{title}</h2>
            <div className="mt-1 flex items-center gap-3 text-sm text-white/60">
              {movie.vote_average ? (
                <span className="inline-flex items-center gap-1 font-semibold text-glow">
                  <StarIcon className="h-4 w-4" /> {movie.vote_average.toFixed(1)}
                </span>
              ) : null}
              <span>{movie.release_date?.slice(0, 4)}</span>
            </div>
          </div>
          <WatchLaterButton movie={movie} />
          {!onDetailsPage && (
            <Link to={`/movie/${movie.id}`} className="btn-ghost">
              <InfoIcon /> Full details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
