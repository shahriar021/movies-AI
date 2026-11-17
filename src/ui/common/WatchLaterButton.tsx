import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { toggleWatchLater } from "../../redux/slice/librarySlice";
import type { Movie } from "../../utils/tmdb";
import { BookmarkIcon, CheckIcon } from "./Icons";

/** "Watch later" toggle. `compact` = round icon button for cards. */
const WatchLaterButton = ({ movie, compact = false }: { movie: Movie; compact?: boolean }) => {
  const dispatch = useAppDispatch();
  const saved = useAppSelector((s) => s.library.watchLater.some((m) => m.id === movie.id));

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWatchLater(movie));
  };

  if (compact) {
    return (
      <button
        onClick={onClick}
        title={saved ? "Remove from Watch later" : "Add to Watch later"}
        aria-label={saved ? "Remove from Watch later" : "Add to Watch later"}
        aria-pressed={saved}
        className={`grid h-9 w-9 place-items-center rounded-full shadow-lg backdrop-blur transition active:scale-90 ${
          saved ? "bg-brand-500 text-white" : "bg-black/60 text-white hover:bg-white hover:text-ink-950"
        }`}
      >
        {saved ? <CheckIcon className="h-4 w-4" /> : <BookmarkIcon className="h-4 w-4" />}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-pressed={saved}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold backdrop-blur transition active:scale-[.98] ${
        saved
          ? "bg-brand-500/20 text-brand-400 ring-1 ring-brand-500/50 hover:bg-brand-500/30"
          : "bg-white/10 text-white hover:bg-white/20"
      }`}
    >
      <BookmarkIcon className="h-5 w-5" filled={saved} />
      {saved ? "In Watch later" : "Watch later"}
    </button>
  );
};

export default WatchLaterButton;
