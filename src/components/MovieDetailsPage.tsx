import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { useAppDispatch } from "../redux/store";
import { addRecent } from "../redux/slice/librarySlice";
import { selectMovie } from "../redux/slice/movieSlice";
import { image_url } from "../utils/constant";
import { pickTrailer } from "../utils/tmdb";
import VideoBackground from "../ui/browse/VideoBackground";
import MovieList from "./MovieList";
import WatchLaterButton from "../ui/common/WatchLaterButton";
import {
  ArrowLeftIcon,
  CheckIcon,
  GlobeIcon,
  PlayIcon,
  ShareIcon,
  StarIcon,
  UserIcon,
} from "../ui/common/Icons";

const money = (n?: number) =>
  n ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact" }).format(n) : "—";

const runtimeText = (min?: number) =>
  min ? `${Math.floor(min / 60)}h ${String(min % 60).padStart(2, "0")}m` : null;

const MovieDetailsPage = () => {
  const { id } = useParams();
  const movieId = Number(id);
  const dispatch = useAppDispatch();
  const { data: movie, error, loading } = useMovieDetails(movieId);
  const [copied, setCopied] = useState(false);

  // Remember this movie in "Recently viewed"
  useEffect(() => {
    if (movie) dispatch(addRecent(movie));
  }, [movie, dispatch]);

  useEffect(() => {
    if (movie) document.title = `${movie.title} · MoviesAI`;
    return () => {
      document.title = "MoviesAI";
    };
  }, [movie]);

  if (error) {
    return (
      <div className="grid min-h-screen place-items-center px-4 pt-16 text-center">
        <div>
          <p className="font-display text-3xl font-bold">Couldn't load this movie</p>
          <p className="mt-2 text-white/50">{error}</p>
          <Link to="/browse" className="btn-primary mt-6">
            <ArrowLeftIcon className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (loading || !movie) {
    return (
      <div className="min-h-screen">
        <div className="h-[80vh] min-h-[560px] w-full animate-pulse bg-gradient-to-b from-ink-800 to-ink-950" />
      </div>
    );
  }

  const trailerKey = pickTrailer(movie.videos?.results);
  const year = movie.release_date?.slice(0, 4);
  const director = movie.credits?.crew.find((c) => c.job === "Director");
  const writers = movie.credits?.crew
    .filter((c) => c.job === "Screenplay" || c.job === "Writer")
    .slice(0, 2);
  const cast = movie.credits?.cast.slice(0, 15) ?? [];
  const recommendations = movie.recommendations?.results.filter((m) => m.poster_path) ?? [];
  const similar = movie.similar?.results.filter((m) => m.poster_path) ?? [];

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <main className="pb-16">
      {/* ---------- HERO ---------- */}
      <section className="relative min-h-[80vh] w-full overflow-hidden">
        <VideoBackground moviesID={movie.id} backdropPath={movie.backdrop_path} trailerKey={trailerKey} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/75 to-ink-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-ink-950/40" />

        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-[1600px] items-end gap-10 px-4 pb-14 pt-32 sm:px-8 lg:px-12">
          {movie.poster_path && (
            <img
              src={image_url + movie.poster_path}
              alt={movie.title}
              className="hidden w-64 shrink-0 rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-white/10 lg:block xl:w-72 animate-pop-in"
            />
          )}
          <div className="max-w-3xl animate-fade-up">
            {movie.genres?.length ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <span key={g.id} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
                    {g.name}
                  </span>
                ))}
              </div>
            ) : null}
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight drop-shadow-lg sm:text-6xl">
              {movie.title}
            </h1>
            {movie.tagline && <p className="mt-2 text-lg italic text-white/60">“{movie.tagline}”</p>}

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-white/75">
              {movie.vote_average ? (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-glow/15 px-2.5 py-1 text-glow">
                  <StarIcon className="h-4 w-4" /> {movie.vote_average.toFixed(1)}
                  <span className="text-xs text-glow/60">({movie.vote_count?.toLocaleString()})</span>
                </span>
              ) : null}
              {year && <span>{year}</span>}
              {runtimeText(movie.runtime) && <span>{runtimeText(movie.runtime)}</span>}
              {movie.original_language && (
                <span className="rounded border border-white/30 px-1.5 text-xs uppercase">
                  {movie.original_language}
                </span>
              )}
            </div>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              {movie.overview || "No overview available."}
            </p>

            {(director || writers?.length) && (
              <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                {director && (
                  <div>
                    <dt className="text-white/45">Director</dt>
                    <dd className="font-semibold">{director.name}</dd>
                  </div>
                )}
                {writers?.length ? (
                  <div>
                    <dt className="text-white/45">Writers</dt>
                    <dd className="font-semibold">{writers.map((w) => w.name).join(", ")}</dd>
                  </div>
                ) : null}
              </dl>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                disabled={!trailerKey}
                onClick={() => dispatch(selectMovie(movie))}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-ink-950 transition hover:bg-white/85 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <PlayIcon /> {trailerKey ? "Play trailer" : "No trailer"}
              </button>
              <WatchLaterButton movie={movie} />
              <button onClick={share} className="btn-ghost" aria-label="Copy link">
                {copied ? <CheckIcon className="h-5 w-5 text-emerald-300" /> : <ShareIcon />}
                <span className="hidden sm:inline">{copied ? "Link copied" : "Share"}</span>
              </button>
              {movie.homepage && (
                <a href={movie.homepage} target="_blank" rel="noreferrer" className="btn-ghost" aria-label="Official site">
                  <GlobeIcon />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CAST + FACTS ---------- */}
      <section className="mx-auto grid max-w-[1600px] gap-10 px-4 py-8 sm:px-8 lg:grid-cols-[1fr_320px] lg:px-12">
        <div className="min-w-0">
          <h2 className="mb-4 font-display text-2xl font-bold">Top cast</h2>
          {cast.length ? (
            <div className="no-scrollbar -mx-1 flex gap-4 overflow-x-auto px-1 pb-2">
              {cast.map((c) => (
                <div key={c.id} className="w-28 shrink-0 text-center">
                  {c.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${c.profile_path}`}
                      alt={c.name}
                      loading="lazy"
                      className="mx-auto h-28 w-28 rounded-full object-cover ring-2 ring-white/10"
                    />
                  ) : (
                    <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-ink-800 text-white/30 ring-2 ring-white/10">
                      <UserIcon className="h-10 w-10" />
                    </div>
                  )}
                  <p className="mt-2 line-clamp-1 text-sm font-semibold">{c.name}</p>
                  <p className="line-clamp-1 text-xs text-white/50">{c.character}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/50">No cast information.</p>
          )}
        </div>

        <aside className="glass h-fit rounded-2xl p-6">
          <h2 className="mb-4 font-display text-lg font-bold">Details</h2>
          <dl className="space-y-3 text-sm">
            {[
              ["Status", movie.status],
              [
                "Release date",
                movie.release_date &&
                  new Date(movie.release_date).toLocaleDateString(undefined, { dateStyle: "long" }),
              ],
              ["Languages", movie.spoken_languages?.map((l) => l.english_name).join(", ")],
              ["Budget", money(movie.budget)],
              ["Box office", money(movie.revenue)],
              ["Studios", movie.production_companies?.slice(0, 3).map((p) => p.name).join(", ")],
            ].map(([label, value]) => (
              <div key={label as string} className="flex justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <dt className="shrink-0 text-white/45">{label}</dt>
                <dd className="text-right font-medium">{value || "—"}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      {/* ---------- MORE ---------- */}
      {recommendations.length > 0 && <MovieList title="More like this" movies={recommendations} />}
      {similar.length > 0 && <MovieList title="Similar movies" movies={similar} />}
    </main>
  );
};

export default MovieDetailsPage;
