import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidation } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../utils/firebase";
const Login = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };
  const email = useRef(null);
  const password = useRef(null);
  const handleSubmit = () => {
    console.log("Email:", email.current.value);
    console.log("Password:", password.current.value);
    const message = checkValidation(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
    console.log(message);
    if (message) return;
    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user, "user");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user, "sign in");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/638e9299-0637-42d1-ba39-54ade4cf2bf6/web/BD-en-20250203-TRIFECTA-perspective_374d61ca-7a16-4fa9-8cf6-1203d333587e_small.jpg"
          alt="loginimg"
        />
      </div>
      <form
        className="bg-black p-12 bg-opacity-80 w-3/12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-white font-bold text-3xl p-2 my-2">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="full name"
            className="p-2 my-2 w-full "
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="email"
          className="p-2 my-2 w-full"
        />
        <input
          ref={password}
          type="password"
          placeholder="password"
          className="p-2 my-2 w-full"
        />
        <p className="text-red-600">{errorMessage}</p>
        <button
          className="bg-red-900 text-white p-2  my-3 w-full"
          onClick={handleSubmit}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <h3 className="text-white" onClick={toggleSignIn}>
          {isSignIn ? "New here,Sign up" : "Already an user,go to Sign In"}
        </h3>
      </form>
    </div>
  );
};

export default Login;
