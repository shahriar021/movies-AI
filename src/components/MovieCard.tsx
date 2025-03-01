import React from "react";
import { image_url } from "../utils/constant";

export default function MovieCard({ posterPath }) {
  return (
    <div className="w-48 pr-4 hover:w-52">
      {}
      <img src={image_url + posterPath} alt="movie image" />
    </div>
  );
}
