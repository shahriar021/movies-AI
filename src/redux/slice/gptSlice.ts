import { createSlice } from "@reduxjs/toolkit";

export const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    toggleGpt: false,
    languageChange: "en"
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.toggleGpt = !state.toggleGpt;
    },
    languageLocalization: (state, action) => {
      state.languageChange = action.payload;
    }
  }
});

export default gptSlice.reducer;
export const { toggleGptSearch, languageLocalization } = gptSlice.actions;
