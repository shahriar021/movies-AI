import React from "react";
import GptSearchBar from "../ui/gptSearch/GptSearchBar";
import GptMovieSuggesion from "../ui/gptSearch/GptMovieSuggesion";

function GptSearch() {
  return (
    <div>
      <div className="absolute -z-20">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/638e9299-0637-42d1-ba39-54ade4cf2bf6/web/BD-en-20250203-TRIFECTA-perspective_374d61ca-7a16-4fa9-8cf6-1203d333587e_small.jpg"
          alt="loginimg"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggesion />
    </div>
  );
}

export default GptSearch;
