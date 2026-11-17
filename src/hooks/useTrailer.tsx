import { useEffect, useState } from "react";
import { fetchTrailerKey } from "../utils/tmdb";

/** YouTube key of a movie's trailer (null while loading / if none). */
export const useTrailer = (movieId?: number) => {
  const [key, setKey] = useState<string | null>(null);

  useEffect(() => {
    setKey(null);
    if (!movieId) return;
    let alive = true;
    fetchTrailerKey(movieId)
      .then((k) => alive && setKey(k))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [movieId]);

  return key;
};
