import React from "react";
import Header from "./Header";
import FirstContainer from "../ui/browse/FirstContainer";
import SecondaryContainer from "../ui/browse/SecondaryContainer";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";

const Browse = () => {
  useNowPlayingMovies();

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
