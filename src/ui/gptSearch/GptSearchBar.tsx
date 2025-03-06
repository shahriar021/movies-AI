import React from "react";
import { lang } from "../../utils/languageconstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const gptLanglocalization = useSelector(
    (store: any) => store.gpt.languageChange
  );
  console.log(gptLanglocalization, " gpt local");
  return (
    <div className=" pt-[10%] flex justify-center">
      <form className=" w-1/2  grid grid-cols-12 bg-black rounded-md p-2">
        <input
          placeholder={lang[gptLanglocalization].gptSearchPlaceholder}
          className="col-span-9 p-4"
        ></input>
        <button className="col-span-3 bg-red-900 text-white p-4">
          {lang[gptLanglocalization].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
