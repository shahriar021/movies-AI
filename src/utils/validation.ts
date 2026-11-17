export const isValidEmail = (email: string) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());

export const passwordRules = [
  { id: "len", label: "8+ characters", test: (p: string) => p.length >= 8 },
  { id: "upper", label: "Uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { id: "lower", label: "Lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { id: "num", label: "Number", test: (p: string) => /\d/.test(p) },
];

/** 0–4: how many password rules pass */
export const passwordScore = (p: string) =>
  passwordRules.filter((r) => r.test(p)).length;

export const checkValidation = (email: string, password: string) => {
  if (!isValidEmail(email)) return "Please enter a valid email address.";
  if (passwordScore(password) < passwordRules.length)
    return "Password needs 8+ characters with uppercase, lowercase and a number.";
  return null;
};
