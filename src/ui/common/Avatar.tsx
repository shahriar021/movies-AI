import React from "react";

const gradients = [
  "from-brand-500 to-glow",
  "from-violet-500 to-fuchsia-500",
  "from-sky-500 to-emerald-400",
  "from-amber-400 to-rose-500",
  "from-indigo-500 to-cyan-400",
];

export const initialsOf = (name?: string | null, email?: string | null) => {
  const source = (name || email || "?").trim();
  const parts = source.split(/[\s@._-]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "?") + (parts[1]?.[0] ?? "")).toUpperCase();
};

const Avatar = ({
  name,
  email,
  photoURL,
  size = 40,
}: {
  name?: string | null;
  email?: string | null;
  photoURL?: string | null;
  size?: number;
}) => {
  const seed = (name || email || "?").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt={name ?? "avatar"}
        style={{ width: size, height: size }}
        className="rounded-full object-cover ring-2 ring-white/20"
      />
    );
  }
  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br ${
        gradients[seed % gradients.length]
      } font-display font-bold text-white ring-2 ring-white/20 transition-all`}
    >
      {initialsOf(name, email)}
    </span>
  );
};

export default Avatar;
