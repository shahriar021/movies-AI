import React from "react";
import MovieList from "../../components/MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store: any) => store.movies);
  console.log(movies?.popularMovies, "movies......");
  return (
    <div className="bg-black">
      <div className=" -mt-52 pl-12 relative z-20">
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies?.popularMovies} />
        <MovieList title={"Tranding"} movies={movies?.nowPlayingMovies} />
        <MovieList title={"Most Viewd"} movies={movies?.nowPlayingMovies} />
      </div>
    </div>
  );
};
export default SecondaryContainer;
