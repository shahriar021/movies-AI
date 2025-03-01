import { useDispatch, useSelector } from "react-redux";
import useMovieTrailer from "../../hooks/useMovieTrailer";
import { options } from "../../utils/constant";
import { addTrailerKey } from "../../redux/slice/movieSlice";
import { useEffect, useState } from "react";

export default function VideoBackground({ moviesID }) {
  const [trailerkey, setTrailerKey] = useState(null);
  const trailerId = useSelector((store: any) => store.movies.trailerKey);
  console.log(moviesID, "id in vidobackground");
  //   useMovieTrailer(moviesID);
  const dispatch = useDispatch();
  const getMovieTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${parseInt(moviesID)}/videos`,
      options
    );
    const jsonData = await data.json();
    console.log(jsonData.results);
    const trailer = jsonData.results?.find(
      (movie: any) => movie.type === "Trailer"
    );
    console.log(trailer.key, "trailer");
    setTrailerKey(trailer.key);
    dispatch(addTrailerKey(trailer));
  };
  useEffect(() => {
    getMovieTrailer();
  }, []);
  console.log(trailerkey, "trailer key");
  return (
    <div className="w-screen aspect-video">
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" + trailerkey + "?autoplay=1&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
}
