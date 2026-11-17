import React from "react";

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 select-none ${className}`}>
    <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-glow shadow-lg shadow-brand-500/30">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
        <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
      </svg>
      <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-white shadow" />
    </span>
    <span className="font-display text-xl font-bold tracking-tight">
      Movies<span className="text-gradient">AI</span>
    </span>
  </div>
);

export default Logo;
