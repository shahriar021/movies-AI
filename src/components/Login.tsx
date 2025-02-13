import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
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
      <form className="bg-black p-12 bg-opacity-80 w-3/12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-white font-bold text-3xl p-2 my-2">
          {isSignIn ? "Sign up" : "Sign In"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="full name"
            className="p-2 my-2 w-full"
          />
        )}
        <input type="text" placeholder="email" className="p-2 my-2 w-full" />
        <input
          type="password"
          placeholder="password"
          className="p-2 my-2 w-full"
        />
        <button className="bg-red-900 text-white p-2  my-3 w-full">
          {isSignIn ? "Sign up" : "Sign In"}
        </button>
        <h3 className="text-white" onClick={toggleSignIn}>
          {isSignIn ? "Already an user,go to Sign In" : "New here,Sign up"}
        </h3>
      </form>
    </div>
  );
};

export default Login;
