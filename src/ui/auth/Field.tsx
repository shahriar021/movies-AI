import React, { useState } from "react";
import { EyeIcon } from "../common/Icons";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
  label: string;
  trailing?: React.ReactNode;
};

/** Input with a leading icon; password inputs get a show/hide toggle. */
const Field = ({ icon, label, trailing, type = "text", ...rest }: Props) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/50">
        {label}
      </span>
      <span className="relative block">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
          {icon}
        </span>
        <input
          {...rest}
          type={isPassword && show ? "text" : type}
          className="field pl-12 pr-12"
        />
        <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
          {trailing}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="rounded-lg p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white"
              aria-label={show ? "Hide password" : "Show password"}
            >
              <EyeIcon className="h-4 w-4" off={show} />
            </button>
          )}
        </span>
      </span>
    </label>
  );
};

export default Field;
