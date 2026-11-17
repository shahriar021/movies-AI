import { options, TMDB_TOKEN } from "./constant";

export type Movie = {
  id: number;
  title?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  release_date?: string;
};

export type CastMember = {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
};

export type CrewMember = { id: number; name: string; job: string };

export type Video = { key: string; site: string; type: string; official?: boolean; name?: string };

export type MovieDetails = Movie & {
  tagline?: string;
  runtime?: number;
  status?: string;
  budget?: number;
  revenue?: number;
  vote_count?: number;
  original_language?: string;
  homepage?: string;
  genres?: { id: number; name: string }[];
  spoken_languages?: { english_name: string }[];
  production_companies?: { id: number; name: string; logo_path?: string | null }[];
  credits?: { cast: CastMember[]; crew: CrewMember[] };
  videos?: { results: Video[] };
  recommendations?: { results: Movie[] };
  similar?: { results: Movie[] };
};

export const hasTmdbToken = () => Boolean(TMDB_TOKEN);

export async function tmdbFetch<T = any>(path: string): Promise<T> {
  if (!TMDB_TOKEN) {
    throw new Error(
      "TMDB token missing — add REACT_APP_TMDB_TOKEN to .env.local and restart the dev server."
    );
  }
  const res = await fetch(`https://api.themoviedb.org/3${path}`, options);
  if (!res.ok) throw new Error(`TMDB request failed (${res.status})`);
  return res.json();
}

export async function fetchMovieList(path: string): Promise<Movie[]> {
  const data = await tmdbFetch<{ results: Movie[] }>(path);
  return data.results ?? [];
}

export function pickTrailer(videos: Video[] = []): string | null {
  const yt = videos.filter((v) => v.site === "YouTube");
  const trailer =
    yt.find((v) => v.type === "Trailer" && v.official) ??
    yt.find((v) => v.type === "Trailer") ??
    yt.find((v) => v.type === "Teaser") ??
    yt[0];
  return trailer?.key ?? null;
}

export async function fetchTrailerKey(movieId: number): Promise<string | null> {
  const data = await tmdbFetch<{ results: Video[] }>(`/movie/${movieId}/videos`);
  return pickTrailer(data.results);
}

/** Everything the movie page needs in one request. */
export async function fetchMovieDetails(movieId: number): Promise<MovieDetails> {
  return tmdbFetch<MovieDetails>(
    `/movie/${movieId}?append_to_response=credits,videos,recommendations,similar`
  );
}

export async function searchMovie(query: string): Promise<Movie[]> {
  return fetchMovieList(
    `/search/movie?query=${encodeURIComponent(query)}&include_adult=false&page=1`
  );
}

/** Keeps only the fields we show on cards (what we store in lists). */
export const toCardMovie = (m: Movie): Movie => ({
  id: m.id,
  title: m.title,
  original_title: m.original_title,
  overview: m.overview,
  poster_path: m.poster_path,
  backdrop_path: m.backdrop_path,
  vote_average: m.vote_average,
  release_date: m.release_date,
});
