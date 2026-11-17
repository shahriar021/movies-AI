import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LangKey } from "../../utils/languageconstants";

// AI Search is its own page now (/search); this only keeps the chosen language.
export const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    languageChange: "en" as LangKey,
  },
  reducers: {
    languageLocalization: (state, action: PayloadAction<LangKey>) => {
      state.languageChange = action.payload;
    },
  },
});

export default gptSlice.reducer;
export const { languageLocalization } = gptSlice.actions;
