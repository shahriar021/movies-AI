import { useDispatch } from "react-redux";
import { options } from "../utils/constant";
import { addNowPlayingMovies } from "../redux/slice/movieSlice";
import { useEffect } from "react";

export const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing",
      options
    );
    const jsonData = await data.json();
    dispatch(addNowPlayingMovies(jsonData.results));
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};
