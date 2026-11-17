import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, toCardMovie } from "../../utils/tmdb";

export type LibraryState = {
  watchLater: Movie[];
  recent: Movie[];
};

const MAX_RECENT = 20;

const initialState: LibraryState = { watchLater: [], recent: [] };

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setLibrary: (_state, action: PayloadAction<LibraryState>) => action.payload,
    clearLibrary: () => initialState,
    toggleWatchLater: (state, action: PayloadAction<Movie>) => {
      const exists = state.watchLater.some((m) => m.id === action.payload.id);
      state.watchLater = exists
        ? state.watchLater.filter((m) => m.id !== action.payload.id)
        : [toCardMovie(action.payload), ...state.watchLater];
    },
    addRecent: (state, action: PayloadAction<Movie>) => {
      state.recent = [
        toCardMovie(action.payload),
        ...state.recent.filter((m) => m.id !== action.payload.id),
      ].slice(0, MAX_RECENT);
    },
    removeRecent: (state, action: PayloadAction<number>) => {
      state.recent = state.recent.filter((m) => m.id !== action.payload);
    },
    clearRecent: (state) => {
      state.recent = [];
    },
  },
});

export const {
  setLibrary,
  clearLibrary,
  toggleWatchLater,
  addRecent,
  removeRecent,
  clearRecent,
} = librarySlice.actions;
export default librarySlice.reducer;
