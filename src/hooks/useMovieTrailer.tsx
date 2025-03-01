import { useEffect } from "react";
import { options } from "../utils/constant";
import { addTrailerKey } from "../redux/slice/movieSlice";
import { useDispatch } from "react-redux";

const useMovieTrailer = async ({ moviesID }) => {
  console.log(moviesID, "movie id ");
  const dispatch = useDispatch();
  const getMovieTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${parseInt(moviesID)}/videos`,
      options
    );
    const jsonData = await data.json();
    console.log(jsonData.results);
    const trailer = jsonData.results?.find(
      (movie: any) => movie.type === "Trailer"
    );
    console.log(trailer, "trailer");
    dispatch(addTrailerKey(trailer));
  };
  useEffect(() => {
    getMovieTrailer();
  }, []);
};

export default useMovieTrailer;
