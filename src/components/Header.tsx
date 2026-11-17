import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { languageLocalization } from "../redux/slice/gptSlice";
import { languagelist } from "../utils/constant";
import type { LangKey } from "../utils/languageconstants";
import Logo from "../ui/common/Logo";
import Avatar from "../ui/common/Avatar";
import { BookmarkIcon, ClockIcon, LogoutIcon, SparkIcon } from "../ui/common/Icons";

const navItems = [
  { to: "/browse", label: "Home" },
  { to: "/my-list", label: "My List" },
  { to: "/search", label: "AI Search" },
];

const Header = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const user = useAppSelector((s) => s.user);
  const language = useAppSelector((s) => s.gpt.languageChange);
  const watchLaterCount = useAppSelector((s) => s.library.watchLater.length);
  const recentCount = useAppSelector((s) => s.library.recent.length);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const onSearch = pathname === "/search";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  const handleSignOut = () => {
    setMenuOpen(false);
    signOut(auth).catch(() => {}); // listener in Body.tsx redirects to "/"
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || onSearch || pathname === "/my-list"
          ? "border-b border-white/5 bg-ink-950/80 backdrop-blur-xl"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
        <div className="flex items-center gap-8">
          <Link to="/browse" aria-label="Home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `relative rounded-lg px-3 py-2 transition ${
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {n.label}
                    {n.to === "/my-list" && watchLaterCount > 0 && (
                      <span className="ml-1.5 rounded-full bg-brand-500 px-1.5 py-0.5 text-[10px] font-bold">
                        {watchLaterCount}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-glow" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {user && (
          <div className="flex items-center gap-2 sm:gap-3">
            {onSearch && (
              <select
                value={language}
                onChange={(e) => dispatch(languageLocalization(e.target.value as LangKey))}
                className="rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-sm outline-none focus:border-brand-500/60"
                aria-label="Language"
              >
                {languagelist.map((l) => (
                  <option key={l.id} value={l.id} className="bg-ink-900">
                    {l.name}
                  </option>
                ))}
              </select>
            )}
            {!onSearch && (
              <Link
                to="/search"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-3 py-2 text-sm font-semibold shadow-lg shadow-brand-500/25 transition hover:brightness-110 sm:px-4"
              >
                <SparkIcon className="h-4 w-4" />
                <span className="hidden sm:inline">AI Search</span>
              </Link>
            )}

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="rounded-full transition hover:scale-105"
                aria-label="Account menu"
              >
                <Avatar name={user.displayName} email={user.email} photoURL={user.photoURL} size={38} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 shadow-2xl backdrop-blur-xl animate-pop-in">
                  <div className="flex items-center gap-3 border-b border-white/10 p-4">
                    <Avatar name={user.displayName} email={user.email} photoURL={user.photoURL} size={44} />
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{user.displayName || "Movie lover"}</p>
                      <p className="truncate text-xs text-white/50">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/my-list"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
                  >
                    <BookmarkIcon className="h-4 w-4" /> Watch later
                    <span className="ml-auto text-xs text-white/40">{watchLaterCount}</span>
                  </Link>
                  <Link
                    to="/my-list#recent"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
                  >
                    <ClockIcon className="h-4 w-4" /> Recently viewed
                    <span className="ml-auto text-xs text-white/40">{recentCount}</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 border-t border-white/10 px-4 py-3 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
                  >
                    <LogoutIcon className="h-4 w-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* mobile nav */}
      <nav className="flex gap-1 overflow-x-auto px-4 pb-2 text-sm font-medium md:hidden no-scrollbar">
        {navItems.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            className={({ isActive }) =>
              `shrink-0 rounded-full px-3 py-1.5 transition ${
                isActive ? "bg-white text-ink-950" : "bg-white/10 text-white/70"
              }`
            }
          >
            {n.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
