import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootType } from "../redux/store";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store: RootType) => store.user);
  const hadleSIgnOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
      <img
        className="w-40"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="headerimg"
      />
      {user && (
        <div className="flex p-2 items-center gap-5">
          <img
            className="w-12 h-12 rounded-lg"
            src={user?.photoURL}
            alt="headerimg"
          />
          <button
            className="font-bold text-white cursor-pointer hover:text-red-800"
            onClick={hadleSIgnOut}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
