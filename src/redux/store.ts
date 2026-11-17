import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import userReducer from "./slice/userSlice";
import movieReducer from "./slice/movieSlice";
import gptReducer from "./slice/gptSlice";
import libraryReducer from "./slice/librarySlice";
import { saveLibrary } from "../utils/preferences";

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    gpt: gptReducer,
    library: libraryReducer,
  },
});

// Save watch later / recently viewed for the signed-in user whenever they change
let lastLibrary = store.getState().library;
store.subscribe(() => {
  const { user, library } = store.getState();
  if (library !== lastLibrary) {
    lastLibrary = library;
    if (user) saveLibrary(user.uid, library);
  }
});

export default store;

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootType>();
