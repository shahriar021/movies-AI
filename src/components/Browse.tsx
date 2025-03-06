import React from "react";
import Header from "./Header";
import FirstContainer from "../ui/browse/FirstContainer";
import SecondaryContainer from "../ui/browse/SecondaryContainer";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import { usePopularMovies } from "../hooks/usePopularMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();

  const gptTgl = useSelector((store: any) => store.gpt.toggleGpt);

  return (
    <div>
      <Header />
      {gptTgl ? (
        <GptSearch />
      ) : (
        <>
          <FirstContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
