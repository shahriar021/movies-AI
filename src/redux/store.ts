import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/slice/userSlice";
import movieReducer from "../redux/slice/movieSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer
  }
});
export default store;

export type RootType = ReturnType<typeof store.getState>;
