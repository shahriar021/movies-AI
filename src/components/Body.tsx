import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/slice/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const appRoute = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/browse", element: <Browse /> }
  ]);

  return (
    <div>
      <RouterProvider router={appRoute} />
    </div>
  );
};

export default Body;
