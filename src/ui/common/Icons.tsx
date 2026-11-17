import React from "react";

type P = { className?: string };
const base = "h-5 w-5";
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const PlayIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
);
export const InfoIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
);
export const MailIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}><rect x="2" y="4" width="20" height="16" rx="3" /><path d="m22 7-10 6L2 7" /></svg>
);
export const LockIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);
export const UserIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
);
export const EyeIcon = ({ className = base, off = false }: P & { off?: boolean }) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="M3 3l18 18" />}
  </svg>
);
export const CheckIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={3}><path d="M20 6 9 17l-5-5" /></svg>
);
export const ArrowLeftIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
);
export const ChevronIcon = ({ className = base, dir = "right" }: P & { dir?: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} style={dir === "left" ? { transform: "rotate(180deg)" } : undefined}><path d="m9 18 6-6-6-6" /></svg>
);
export const SparkIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9L12 2Zm7 12 .9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14Z" /></svg>
);
export const SearchIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
);
export const CloseIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M18 6 6 18M6 6l12 12" /></svg>
);
export const LogoutIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
);
export const StarIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z" /></svg>
);
export const BookmarkIcon = ({ className = base, filled = false }: P & { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} fill={filled ? "currentColor" : "none"}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
);
export const ClockIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
);
export const TrashIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></svg>
);
export const GlobeIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></svg>
);
export const ShareIcon = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></svg>
);
export const Spinner =({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={`${className} animate-spin`} fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".25" strokeWidth="3" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
