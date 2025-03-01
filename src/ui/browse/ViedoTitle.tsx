import React from "react";

const VideoTitle = ({ title, overView }) => {
  return (
    <div className=" w-screen px-12 pt-[20%] absolute bg-gradient-to-r from-black aspect-video text-white">
      <h1 className="font-bold text-6xl ">{title}</h1>
      <p className="w-4/12 font-semibold py-6">{overView}</p>
      <div>
        <button className="p-2 m-2 border border-gray-400 bg-white text-black rounded-md text-xl hover:bg-gray-400">
          ▶ Play
        </button>
        <button className="p-2 m-2 border border-gray-400 bg-white hover:bg-gray-400 text-black rounded-md text-xl">
          More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;
