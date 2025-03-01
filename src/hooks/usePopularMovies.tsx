import { useDispatch } from "react-redux";
import { options } from "../utils/constant";
import { addPopularMovies } from "../redux/slice/movieSlice";
import { useEffect } from "react";

export const usePopularMovies = () => {
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular",
      options
    );
    const jsonData = await data.json();
    dispatch(addPopularMovies(jsonData.results));
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};
