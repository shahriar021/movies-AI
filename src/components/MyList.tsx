import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { clearRecent, removeRecent } from "../redux/slice/librarySlice";
import MovieCard from "./MovieCard";
import { BookmarkIcon, ClockIcon, SparkIcon, TrashIcon } from "../ui/common/Icons";

type Tab = "watch" | "recent";

const MyList = () => {
  const dispatch = useAppDispatch();
  const { hash } = useLocation();
  const { watchLater, recent } = useAppSelector((s) => s.library);
  const [tab, setTab] = useState<Tab>(hash === "#recent" ? "recent" : "watch");

  useEffect(() => setTab(hash === "#recent" ? "recent" : "watch"), [hash]);

  const movies = tab === "watch" ? watchLater : recent;
  const tabs: { id: Tab; label: string; count: number; icon: React.ReactNode }[] = [
    { id: "watch", label: "Watch later", count: watchLater.length, icon: <BookmarkIcon className="h-4 w-4" /> },
    { id: "recent", label: "Recently viewed", count: recent.length, icon: <ClockIcon className="h-4 w-4" /> },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-[1600px] px-4 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-4 animate-fade-up">
        <div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">My List</h1>
          <p className="mt-2 text-white/50">Movies you saved and movies you've looked at.</p>
        </div>
        {tab === "recent" && recent.length > 0 && (
          <button
            onClick={() => dispatch(clearRecent())}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <TrashIcon className="h-4 w-4" /> Clear history
          </button>
        )}
      </div>

      <div className="mt-8 inline-flex rounded-xl bg-white/5 p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
              tab === t.id ? "bg-white/10 text-white shadow" : "text-white/50 hover:text-white"
            }`}
          >
            {t.icon} {t.label}
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{t.count}</span>
          </button>
        ))}
      </div>

      {movies.length ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {movies.map((m, i) => (
            <div key={m.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }}>
              <MovieCard
                movie={m}
                fluid
                onRemove={tab === "recent" ? () => dispatch(removeRecent(m.id)) : undefined}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center text-center animate-fade-up">
          <div className="grid h-20 w-20 place-items-center rounded-3xl bg-white/5 text-white/40">
            {tab === "watch" ? <BookmarkIcon className="h-9 w-9" /> : <ClockIcon className="h-9 w-9" />}
          </div>
          <h2 className="mt-6 font-display text-2xl font-bold">
            {tab === "watch" ? "Nothing saved yet" : "No history yet"}
          </h2>
          <p className="mt-2 max-w-sm text-white/50">
            {tab === "watch"
              ? "Tap the bookmark on any movie to save it for later."
              : "Movies you open will show up here so you can jump back in."}
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/browse" className="btn-ghost">Browse movies</Link>
            <Link to="/search" className="btn-primary">
              <SparkIcon className="h-4 w-4" /> Ask AI
            </Link>
          </div>
        </div>
      )}
    </main>
  );
};

export default MyList;
