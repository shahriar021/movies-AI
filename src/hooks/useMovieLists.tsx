import { useEffect } from "react";
import { ListKey, setList, setMovieError } from "../redux/slice/movieSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchMovieList } from "../utils/tmdb";
import { loadGenres } from "../utils/preferences";

const endpoints: Record<Exclude<ListKey, "forYou">, string> = {
  nowPlaying: "/movie/now_playing",
  popular: "/movie/popular",
  topRated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
};

/** Loads every row on the browse page once per signed-in user. */
export const useMovieLists = () => {
  const dispatch = useAppDispatch();
  const uid = useAppSelector((s) => s.user?.uid);
  const loaded = useAppSelector((s) => Boolean(s.movies.lists.nowPlaying));

  useEffect(() => {
    if (!uid || loaded) return;
    let alive = true;

    const jobs: Array<[ListKey, string]> = Object.entries(endpoints) as Array<[ListKey, string]>;
    const genres = loadGenres(uid);
    if (genres.length) {
      // "|" = OR, so any of the picked genres matches
      jobs.push(["forYou", `/discover/movie?sort_by=popularity.desc&with_genres=${genres.join("|")}`]);
    }

    Promise.all(
      jobs.map(async ([key, path]) => {
        const movies = await fetchMovieList(path);
        if (alive) dispatch(setList({ key, movies }));
      })
    )
      .then(() => alive && dispatch(setMovieError(null)))
      .catch((e: Error) => alive && dispatch(setMovieError(e.message)));

    return () => {
      alive = false;
    };
  }, [uid, loaded, dispatch]);
};
