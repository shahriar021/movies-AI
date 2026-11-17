import React from "react";
import Logo from "./Logo";

const Splash = () => (
  <div className="grid min-h-screen place-items-center bg-ink-950">
    <div className="flex flex-col items-center gap-6 animate-fade-up">
      <Logo className="scale-125" />
      <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-brand-500 to-glow" />
      </div>
    </div>
  </div>
);

export default Splash;
