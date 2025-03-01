import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./ViedoTitle";
import VideoBackground from "./VideoBackground";

const FirstContainer = () => {
  const movies = useSelector((store: any) => store.movies?.nowPlayingMovies);
  if (!movies) return;
  const mainMovie = movies[0];
  console.log(mainMovie.id, "mainMovie.id");
  return (
    <div>
      <VideoTitle
        title={mainMovie.original_title}
        overView={mainMovie.overview}
      />
      <VideoBackground moviesID={mainMovie.id} />
    </div>
  );
};

export default FirstContainer;
