import React from "react";
import { passwordRules, passwordScore } from "../../utils/validation";
import { CheckIcon } from "../common/Icons";

const labels = ["Too weak", "Weak", "Okay", "Good", "Strong 💪"];
const colors = ["bg-white/15", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-emerald-400"];

const PasswordMeter = ({ password }: { password: string }) => {
  const score = passwordScore(password);
  return (
    <div className="space-y-2.5 animate-fade-up">
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full transition-all duration-500 ${colors[score]}`}
              style={{ width: score >= i ? "100%" : "0%" }}
            />
          </div>
        ))}
        <span className="ml-2 w-20 text-right text-xs font-medium text-white/60">
          {password ? labels[score] : ""}
        </span>
      </div>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
        {passwordRules.map((r) => {
          const ok = r.test(password);
          return (
            <li
              key={r.id}
              className={`flex items-center gap-2 text-xs transition-colors ${
                ok ? "text-emerald-300" : "text-white/45"
              }`}
            >
              <span
                className={`grid h-4 w-4 place-items-center rounded-full transition-all duration-300 ${
                  ok ? "scale-100 bg-emerald-400/20" : "scale-90 bg-white/10"
                }`}
              >
                {ok && <CheckIcon className="h-2.5 w-2.5" />}
              </span>
              {r.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordMeter;
