import fb2kTmGrammar from "@/tm-grammars/fb2k.json"

export const shikiConfig = {
  defaultColor: false,
  langs: [fb2kTmGrammar],
  themes: {
    light: "github-light",
    dark: "github-dark",
  },
} as const
