import React from "react";
import MovieList from "../../components/MovieList";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { removeRecent } from "../../redux/slice/librarySlice";
import { BookmarkIcon, ClockIcon } from "../common/Icons";

const SecondaryContainer = () => {
  const dispatch = useAppDispatch();
  const { lists, error } = useAppSelector((s) => s.movies);
  const { watchLater, recent } = useAppSelector((s) => s.library);
  const userName = useAppSelector((s) => s.user?.displayName?.split(" ")[0]);

  return (
    <div className="relative z-20 -mt-32 space-y-2 pb-16">
      {error && (
        <div className="mx-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-200 sm:mx-8 lg:mx-12">
          <p className="font-semibold">Couldn't load movies</p>
          <p className="mt-1 text-red-200/80">{error}</p>
        </div>
      )}
      {recent.length > 0 && (
        <MovieList
          title="Recently viewed"
          icon={<ClockIcon />}
          movies={recent}
          seeAllTo="/my-list#recent"
          onRemove={(m) => dispatch(removeRecent(m.id))}
        />
      )}
      {lists.forYou && lists.forYou.length > 0 && (
        <MovieList
          title={userName ? `Picked for ${userName}` : "Picked for you"}
          badge="For you"
          movies={lists.forYou}
        />
      )}
      {watchLater.length > 0 && (
        <MovieList
          title="Watch later"
          icon={<BookmarkIcon filled />}
          movies={watchLater}
          seeAllTo="/my-list"
        />
      )}
      <MovieList title="Now Playing" movies={lists.nowPlaying} />
      <MovieList title="Trending Now" movies={lists.popular} ranked />
      <MovieList title="Top Rated" movies={lists.topRated} />
      <MovieList title="Coming Soon" movies={lists.upcoming} />
    </div>
  );
};

export default SecondaryContainer;
