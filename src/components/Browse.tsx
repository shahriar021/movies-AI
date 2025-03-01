import React from "react";
import Header from "./Header";
import FirstContainer from "../ui/browse/FirstContainer";
import SecondaryContainer from "../ui/browse/SecondaryContainer";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import { usePopularMovies } from "../hooks/usePopularMovies";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();

  return (
    <div>
      <Header />
      {/* first container */}
      <FirstContainer />
      {/* secondary container */}
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
