import React from "react";
import { lang } from "../../utils/languageconstants";
import { useSelector } from "react-redux";
import { openai } from "../../utils/openAI";

const GptSearchBar = () => {
  const gptLanglocalization = useSelector(
    (store: any) => store.gpt.languageChange
  );

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleGPTsearch = async (retryCount = 3, delayMs = 1000) => {
    for (let i = 0; i < retryCount; i++) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: "write a haiku about AI" }]
        });

        console.log(completion.choices[0].message);
        return;
      } catch (error: any) {
        if (error.status === 429) {
          console.warn(`Rate limit hit. Retrying in ${delayMs}ms...`);
          await delay(delayMs);
          delayMs *= 2; // Increase delay for the next retry
        } else {
          console.error("Error fetching completion:", error);
          return;
        }
      }
    }
    console.error("Failed after multiple retries.");
  };

  return (
    <div className=" pt-[10%] flex justify-center">
      <form
        className=" w-1/2  grid grid-cols-12 bg-black rounded-md p-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          placeholder={lang[gptLanglocalization].gptSearchPlaceholder}
          className="col-span-9 p-4"
        ></input>
        <button
          className="col-span-3 bg-red-900 text-white p-4"
          onClick={() => handleGPTsearch()}
        >
          {lang[gptLanglocalization].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
