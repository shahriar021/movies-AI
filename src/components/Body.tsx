import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import Browse from "./Browse";
import GptSearch from "./GptSearch";
import MovieDetailsPage from "./MovieDetailsPage";
import MyList from "./MyList";
import Header from "./Header";
import MovieModal from "../ui/browse/MovieModal";
import Splash from "../ui/common/Splash";
import { auth } from "../utils/firebase";
import { loadLibrary } from "../utils/preferences";
import { addUser, removeUser } from "../redux/slice/userSlice";
import { resetMovies, selectMovie } from "../redux/slice/movieSlice";
import { clearLibrary, setLibrary } from "../redux/slice/librarySlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

/** Listens to Firebase auth once for the whole app and waits for the first answer. */
const AuthLayout = () => {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(setLibrary(loadLibrary(uid)));
        dispatch(addUser({ uid, email, displayName, photoURL }));
      } else {
        dispatch(removeUser());
        dispatch(clearLibrary());
        dispatch(resetMovies());
      }
      setReady(true);
    });
    return unsubscribe;
  }, [dispatch]);

  return ready ? <Outlet /> : <Splash />;
};

/** Signed-in pages: header on top, trailer popup available everywhere. */
const AppShell = () => {
  const user = useAppSelector((s) => s.user);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    dispatch(selectMovie(null)); // close the trailer popup when changing page
  }, [pathname, dispatch]);

  if (!user) return <Navigate to="/" replace />;
  return (
    <div className="min-h-screen bg-ink-950">
      <Header />
      <Outlet />
      <MovieModal />
    </div>
  );
};

const GuestOnly = ({ children }: { children: React.ReactElement }) => {
  const user = useAppSelector((s) => s.user);
  return user ? <Navigate to="/browse" replace /> : children;
};

const appRoute = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <GuestOnly><Login /></GuestOnly> },
      {
        element: <AppShell />,
        children: [
          { path: "/browse", element: <Browse /> },
          { path: "/movie/:id", element: <MovieDetailsPage /> },
          { path: "/my-list", element: <MyList /> },
          { path: "/search", element: <GptSearch /> },
        ],
      },
      // Any unknown URL falls back to the start page instead of a 404 screen
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

const Body = () => <RouterProvider router={appRoute} />;

export default Body;
