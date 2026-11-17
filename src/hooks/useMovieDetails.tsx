import { useEffect, useState } from "react";
import { fetchMovieDetails, MovieDetails } from "../utils/tmdb";

export const useMovieDetails = (movieId?: number) => {
  const [data, setData] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;
    let alive = true;
    setLoading(true);
    setError(null);
    setData(null);
    fetchMovieDetails(movieId)
      .then((d) => alive && setData(d))
      .catch((e: Error) => alive && setError(e.message))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [movieId]);

  return { data, error, loading };
};
