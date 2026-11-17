import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, friendlyAuthError } from "../utils/firebase";
import { checkValidation, isValidEmail } from "../utils/validation";
import { clearPendingGenres, savePendingGenres } from "../utils/preferences";
import { GENRES } from "../utils/constant";
import { addUser } from "../redux/slice/userSlice";
import { useAppDispatch } from "../redux/store";
import Logo from "../ui/common/Logo";
import Avatar from "../ui/common/Avatar";
import PosterWall from "../ui/auth/PosterWall";
import Field from "../ui/auth/Field";
import PasswordMeter from "../ui/auth/PasswordMeter";
import {
  ArrowLeftIcon,
  CheckIcon,
  LockIcon,
  MailIcon,
  SparkIcon,
  Spinner,
  UserIcon,
} from "../ui/common/Icons";

type Mode = "signin" | "signup" | "forgot";

const features = [
  { icon: "✨", title: "AI search", text: "Describe a mood — get the perfect movie." },
  { icon: "🎬", title: "Trailers first", text: "Watch before you commit." },
  { icon: "🎯", title: "Made for you", text: "Rows tuned to the genres you love." },
];

const Login = () => {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<Mode>("signin");
  const [step, setStep] = useState<1 | 2>(1); // sign-up step
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [genres, setGenres] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const switchMode = (m: Mode) => {
    setMode(m);
    setStep(1);
    setError("");
    setResetSent(false);
  };

  const firstName = name.trim().split(" ")[0];
  const passwordsMatch = confirm.length > 0 && confirm === password;

  // ---------- handlers ----------
  const handleSignIn = async () => {
    if (!isValidEmail(email)) return setError("Please enter a valid email address.");
    if (!password) return setError("Please enter your password.");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // The auth listener in Body.tsx stores the user and redirects to /browse
    } catch (e: any) {
      setError(friendlyAuthError(e.code));
      setLoading(false);
    }
  };

  const handleSignUpStep1 = () => {
    if (name.trim().length < 2) return setError("Please tell us your name.");
    const msg = checkValidation(email, password);
    if (msg) return setError(msg);
    if (password !== confirm) return setError("Passwords don't match.");
    setError("");
    setStep(2);
  };

  const handleCreateAccount = async () => {
    setLoading(true);
    setError("");
    savePendingGenres(genres);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(user, { displayName: name.trim() });
      // The listener fired before the name was saved, so push the final profile
      dispatch(
        addUser({
          uid: user.uid,
          email: user.email,
          displayName: name.trim(),
          photoURL: user.photoURL,
        })
      );
    } catch (e: any) {
      clearPendingGenres();
      setError(friendlyAuthError(e.code));
      if (e.code === "auth/email-already-in-use" || e.code === "auth/invalid-email") setStep(1);
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    if (!isValidEmail(email)) return setError("Enter the email you signed up with.");
    setLoading(true);
    setError("");
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setResetSent(true);
    } catch (e: any) {
      setError(friendlyAuthError(e.code));
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    if (mode === "signin") handleSignIn();
    else if (mode === "forgot") handleForgot();
    else if (step === 1) handleSignUpStep1();
    else handleCreateAccount();
  };

  const toggleGenre = (id: number) =>
    setGenres((g) => (g.includes(id) ? g.filter((x) => x !== id) : [...g, id]));

  // ---------- UI ----------
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink-950">
      <PosterWall />
      {/* glow blobs */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-glow/10 blur-3xl animate-blob [animation-delay:-7s]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-8">
        <header className="py-6">
          <Logo />
        </header>

        <main className="flex flex-1 flex-col items-center justify-center gap-12 pb-12 lg:flex-row lg:justify-between">
          {/* left: pitch */}
          <section className="hidden max-w-lg lg:block animate-fade-up">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
              <SparkIcon className="h-3.5 w-3.5 text-glow" /> Powered by AI
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight xl:text-6xl">
              Stop scrolling.
              <br />
              <span className="text-gradient">Start watching.</span>
            </h1>
            <p className="mt-5 text-lg text-white/60">
              Tell MoviesAI what you're in the mood for and get picks that actually fit your night.
            </p>
            <ul className="mt-10 space-y-4">
              {features.map((f, i) => (
                <li
                  key={f.title}
                  className="flex items-center gap-4 animate-fade-up"
                  style={{ animationDelay: `${150 + i * 120}ms` }}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl glass text-xl">
                    {f.icon}
                  </span>
                  <div>
                    <p className="font-semibold">{f.title}</p>
                    <p className="text-sm text-white/50">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* right: card */}
          <form
            onSubmit={onSubmit}
            noValidate
            className="w-full max-w-md rounded-3xl glass p-6 shadow-2xl shadow-black/50 sm:p-8 animate-pop-in"
          >
            {mode !== "forgot" && (
              <div className="relative mb-7 grid grid-cols-2 rounded-xl bg-white/5 p-1 text-sm font-semibold">
                <span
                  className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-lg bg-white/10 shadow transition-transform duration-300 ${
                    mode === "signup" ? "translate-x-full" : ""
                  }`}
                />
                {(["signin", "signup"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => switchMode(m)}
                    className={`relative z-10 rounded-lg py-2.5 transition-colors ${
                      mode === m ? "text-white" : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    {m === "signin" ? "Sign in" : "Create account"}
                  </button>
                ))}
              </div>
            )}

            {/* ---------- SIGN IN ---------- */}
            {mode === "signin" && (
              <div key="signin" className="space-y-5 animate-fade-up">
                <div>
                  <h2 className="font-display text-3xl font-bold">Welcome back 🍿</h2>
                  <p className="mt-1 text-sm text-white/50">Your watchlist missed you.</p>
                </div>
                <Field
                  label="Email"
                  icon={<MailIcon className="h-4 w-4" />}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div>
                  <Field
                    label="Password"
                    icon={<LockIcon className="h-4 w-4" />}
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="mt-2 text-right">
                    <button
                      type="button"
                      onClick={() => switchMode("forgot")}
                      className="text-sm font-medium text-brand-400 hover:text-brand-500"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ---------- SIGN UP ---------- */}
            {mode === "signup" && (
              <div key={`signup-${step}`} className="space-y-5 animate-fade-up">
                {/* progress */}
                <div className="flex items-center gap-2 text-xs font-medium text-white/50">
                  <span className={step === 1 ? "text-white" : ""}>1 · Profile</span>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-glow transition-all duration-500"
                      style={{ width: step === 1 ? "50%" : "100%" }}
                    />
                  </div>
                  <span className={step === 2 ? "text-white" : ""}>2 · Your vibe</span>
                </div>

                {step === 1 ? (
                  <>
                    {/* live identity preview */}
                    <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-white/[0.07] to-transparent p-4">
                      <Avatar name={name} email={email} size={56} />
                      <div className="min-w-0">
                        <p className="truncate font-display text-xl font-bold">
                          {firstName ? `Hey ${firstName} 👋` : "Let's set you up"}
                        </p>
                        <p className="truncate text-sm text-white/50">
                          {email || "Your profile updates as you type"}
                        </p>
                      </div>
                    </div>
                    <Field
                      label="Full name"
                      icon={<UserIcon className="h-4 w-4" />}
                      autoComplete="name"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Field
                      label="Email"
                      icon={<MailIcon className="h-4 w-4" />}
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Field
                      label="Password"
                      icon={<LockIcon className="h-4 w-4" />}
                      type="password"
                      autoComplete="new-password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {password && <PasswordMeter password={password} />}
                    <Field
                      label="Confirm password"
                      icon={<LockIcon className="h-4 w-4" />}
                      type="password"
                      autoComplete="new-password"
                      placeholder="Type it again"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      trailing={
                        passwordsMatch ? (
                          <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/20 text-emerald-300 animate-pop-in">
                            <CheckIcon className="h-3 w-3" />
                          </span>
                        ) : null
                      }
                    />
                  </>
                ) : (
                  <>
                    <div>
                      <h2 className="font-display text-2xl font-bold">
                        What's your vibe{firstName ? `, ${firstName}` : ""}?
                      </h2>
                      <p className="mt-1 text-sm text-white/50">
                        Pick a few genres — we'll build a row just for you.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {GENRES.map((g) => {
                        const on = genres.includes(g.id);
                        return (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => toggleGenre(g.id)}
                            aria-pressed={on}
                            className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-xs font-semibold transition-all duration-200 active:scale-95 ${
                              on
                                ? "border-brand-500/70 bg-brand-500/15 text-white shadow-lg shadow-brand-500/10"
                                : "border-white/10 bg-white/[0.04] text-white/60 hover:border-white/25 hover:text-white"
                            }`}
                          >
                            <span className={`text-xl transition-transform ${on ? "scale-125" : ""}`}>
                              {g.emoji}
                            </span>
                            {g.name}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-center text-xs text-white/40">
                      {genres.length === 0
                        ? "Optional — you can skip this"
                        : `${genres.length} selected ${genres.length >= 3 ? "— great taste 🔥" : ""}`}
                    </p>
                  </>
                )}
              </div>
            )}

            {/* ---------- FORGOT PASSWORD ---------- */}
            {mode === "forgot" && (
              <div key="forgot" className="space-y-5 animate-fade-up">
                <button
                  type="button"
                  onClick={() => switchMode("signin")}
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white"
                >
                  <ArrowLeftIcon className="h-4 w-4" /> Back to sign in
                </button>
                {resetSent ? (
                  <div className="py-4 text-center animate-pop-in">
                    <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                      <MailIcon className="h-8 w-8" />
                    </div>
                    <h2 className="font-display text-2xl font-bold">Check your inbox</h2>
                    <p className="mt-2 text-sm text-white/60">
                      If an account exists for <span className="font-semibold text-white">{email}</span>,
                      you'll get a link to reset your password. Don't forget the spam folder.
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <h2 className="font-display text-3xl font-bold">Forgot password?</h2>
                      <p className="mt-1 text-sm text-white/50">
                        No worries — we'll email you a reset link.
                      </p>
                    </div>
                    <Field
                      label="Email"
                      icon={<MailIcon className="h-4 w-4" />}
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </>
                )}
              </div>
            )}

            {/* error */}
            {error && (
              <p
                role="alert"
                className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 animate-pop-in"
              >
                {error}
              </p>
            )}

            {/* actions */}
            <div className="mt-6 flex gap-3">
              {mode === "signup" && step === 2 && (
                <button type="button" className="btn-ghost" onClick={() => setStep(1)}>
                  <ArrowLeftIcon className="h-4 w-4" />
                </button>
              )}
              {mode === "forgot" && resetSent ? (
                <button type="button" className="btn-primary w-full" onClick={() => switchMode("signin")}>
                  Back to sign in
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary flex-1"
                  disabled={loading}
                >
                  {loading && <Spinner />}
                  {mode === "signin" && (loading ? "Signing in…" : "Sign in")}
                  {mode === "forgot" && (loading ? "Sending…" : "Send reset link")}
                  {mode === "signup" && step === 1 && "Continue"}
                  {mode === "signup" && step === 2 &&
                    (loading ? "Creating account…" : genres.length ? "Create account" : "Skip & create account")}
                </button>
              )}
            </div>

            {mode !== "forgot" && (
              <p className="mt-6 text-center text-sm text-white/50">
                {mode === "signin" ? "New to MoviesAI? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => switchMode(mode === "signin" ? "signup" : "signin")}
                  className="font-semibold text-white hover:text-brand-400"
                >
                  {mode === "signin" ? "Create an account" : "Sign in"}
                </button>
              </p>
            )}
          </form>
        </main>
      </div>
    </div>
  );
};

export default Login;
