import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div>
      <div className="p-6">
        <h1 className="font-bold text-3xl text-white p-3 "> {title}</h1>
        <div className="flex overflow-x-scroll">
          <div className="flex ">
            {movies?.map((movie: any) => (
              <MovieCard posterPath={movie.poster_path} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
