import React from "react";
import FirstContainer from "../ui/browse/FirstContainer";
import SecondaryContainer from "../ui/browse/SecondaryContainer";
import { useMovieLists } from "../hooks/useMovieLists";

const Browse = () => {
  useMovieLists();
  return (
    <main>
      <FirstContainer />
      <SecondaryContainer />
    </main>
  );
};

export default Browse;
