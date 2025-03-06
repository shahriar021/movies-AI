import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/slice/userSlice";
import movieReducer from "../redux/slice/movieSlice";
import gptReducer from "../redux/slice/gptSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    gpt: gptReducer
  }
});
export default store;

export type RootType = ReturnType<typeof store.getState>;
