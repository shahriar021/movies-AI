import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../../utils/tmdb";

export type ListKey = "nowPlaying" | "popular" | "topRated" | "upcoming" | "forYou";

type MovieState = {
  lists: Partial<Record<ListKey, Movie[]>>;
  error: string | null;
  selected: Movie | null; // movie open in the details modal
};

const initialState: MovieState = { lists: {}, error: null, selected: null };

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<{ key: ListKey; movies: Movie[] }>) => {
      state.lists[action.payload.key] = action.payload.movies;
    },
    setMovieError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    selectMovie: (state, action: PayloadAction<Movie | null>) => {
      state.selected = action.payload;
    },
    resetMovies: () => initialState,
  },
});

export const { setList, setMovieError, selectMovie, resetMovies } = movieSlice.actions;
export default movieSlice.reducer;
