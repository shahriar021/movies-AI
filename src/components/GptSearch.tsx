import React, { useState } from "react";
import { useAppSelector } from "../redux/store";
import { lang } from "../utils/languageconstants";
import { getAIMovieTitles, openai } from "../utils/openAI";
import { Movie, searchMovie } from "../utils/tmdb";
import MovieCard from "./MovieCard";
import { SearchIcon, SparkIcon, Spinner } from "../ui/common/Icons";

const suggestions = [
  "Mind-bending sci-fi like Inception",
  "Feel-good comedies for a lazy Sunday",
  "Scary but not gory horror",
  "Bangladeshi classics",
];

type Group = { title: string; movies: Movie[] };

const GptSearch = () => {
  const language = useAppSelector((s) => s.gpt.languageChange);
  const t = lang[language] ?? lang.en;
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Group[] | null>(null);

  const runSearch = async (q: string) => {
    const text = q.trim();
    if (!text || loading) return;
    setQuery(text);
    setLoading(true);
    setError("");
    try {
      if (openai) {
        // AI turns the request into titles, TMDB gives us posters for each
        const titles = await getAIMovieTitles(text);
        const found = await Promise.all(titles.map((title) => searchMovie(title)));
        setResults(
          titles
            .map((title, i) => ({ title, movies: found[i].slice(0, 1) }))
            .filter((g) => g.movies.length)
        );
      } else {
        // No OpenAI key: plain TMDB search still works
        const movies = await searchMovie(text);
        setResults([{ title: "", movies }]);
      }
    } catch (e: any) {
      setError(
        e?.status === 429
          ? "AI is busy right now (rate limit). Try again in a moment."
          : e?.message || "Search failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const allMovies = results?.flatMap((g) => g.movies) ?? [];

  return (
    <div className="relative min-h-screen overflow-hidden pt-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-glow/10 blur-3xl animate-blob" />

      <div className="relative mx-auto max-w-3xl px-4 text-center animate-fade-up">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
          <SparkIcon className="h-3.5 w-3.5 text-glow" />
          {openai ? "AI recommendations" : "Smart search"}
        </span>
        <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          {t.heading}
        </h1>
        <p className="mt-3 text-white/60">{t.sub}</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            runSearch(query);
          }}
          className="mt-8 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] p-2 shadow-2xl shadow-black/40 backdrop-blur-xl transition focus-within:border-brand-500/60 focus-within:ring-4 focus-within:ring-brand-500/15"
        >
          <SearchIcon className="ml-3 h-5 w-5 shrink-0 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.gptSearchPlaceholder}
            className="min-w-0 flex-1 bg-transparent px-2 py-3 text-white placeholder-white/40 outline-none"
            autoFocus
          />
          <button type="submit" className="btn-primary px-6" disabled={loading || !query.trim()}>
            {loading ? <Spinner /> : <SparkIcon className="h-4 w-4" />}
            <span className="hidden sm:inline">{t.search}</span>
          </button>
        </form>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => runSearch(s)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:border-white/25 hover:text-white"
            >
              {s}
            </button>
          ))}
        </div>
        {!openai && (
          <p className="mt-4 text-xs text-white/35">
            Tip: add REACT_APP_OPENAI_KEY to .env.local to turn on real AI recommendations.
          </p>
        )}
      </div>

      <div className="relative mx-auto mt-12 max-w-[1600px] px-4 pb-20 sm:px-8 lg:px-12">
        {error && (
          <p className="mx-auto max-w-xl rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200">
            {error}
          </p>
        )}
        {loading && (
          <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="relative aspect-[2/3] w-36 overflow-hidden rounded-xl bg-ink-800 sm:w-44">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>
            ))}
          </div>
        )}
        {!loading && results && (
          allMovies.length ? (
            <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {allMovies.map((m, i) => (
                <div key={m.id} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <MovieCard movie={m} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white/50">No movies found. Try describing it differently.</p>
          )
        )}
      </div>
    </div>
  );
};

export default GptSearch;
