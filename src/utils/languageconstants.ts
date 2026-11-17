export type LangKey = "en" | "bn" | "hi" | "es";

export const lang: Record<
  LangKey,
  { search: string; gptSearchPlaceholder: string; heading: string; sub: string }
> = {
  en: {
    search: "Search",
    gptSearchPlaceholder: "e.g. funny sci-fi movies for a rainy night",
    heading: "What do you feel like watching?",
    sub: "Describe a mood, a plot, an actor — AI finds the movies.",
  },
  bn: {
    search: "অনুসন্ধান",
    gptSearchPlaceholder: "যেমন: বৃষ্টির রাতের জন্য মজার সাই-ফাই সিনেমা",
    heading: "আজ কী দেখতে ইচ্ছে করছে?",
    sub: "মুড, গল্প বা অভিনেতার কথা লিখুন — এআই সিনেমা খুঁজে দেবে।",
  },
  hi: {
    search: "खोजें",
    gptSearchPlaceholder: "जैसे: बारिश की रात के लिए मज़ेदार साई-फाई फ़िल्में",
    heading: "आज क्या देखने का मन है?",
    sub: "मूड, कहानी या अभिनेता बताइए — एआई फ़िल्में ढूँढेगा।",
  },
  es: {
    search: "Buscar",
    gptSearchPlaceholder: "p. ej. películas de ciencia ficción divertidas",
    heading: "¿Qué te apetece ver?",
    sub: "Describe un ánimo, una trama o un actor — la IA encuentra películas.",
  },
};
