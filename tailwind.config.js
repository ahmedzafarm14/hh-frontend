import {
  TextColor,
  PrimaryColor,
  SecondaryColor,
  BackgroundColor,
  LightBackground,
  AccentColor1,
  AccentColor2,
  AccentColor3,
  HighlightColor,
  SuccessColor,
  ErrorColor,
  RatingColor,
} from "./src/Theme/ColorBoilerplate";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        TextColor: TextColor,
        SecondaryColor: SecondaryColor,
        BackgroundColor: BackgroundColor,
        LightBackground: LightBackground,
        PrimaryColor: PrimaryColor,
        AccentColor1: AccentColor1,
        AccentColor2: AccentColor2,
        AccentColor3: AccentColor3,
        SuccessColor: SuccessColor,
        ErrorColor: ErrorColor,
        HighlightColor: HighlightColor,
        RatingColor: RatingColor,
      },
      fontSize: {
        h1: ["26px", { lineHeight: "32px", fontWeight: "700" }],
        h2: ["24px", { lineHeight: "28px", fontWeight: "700" }],
        h3: ["22px", { lineHeight: "26px", fontWeight: "700" }],
        h4: ["20px", { lineHeight: "24px", fontWeight: "600" }],
        h5: ["18px", { lineHeight: "22px", fontWeight: "600" }],
        h6: ["16px", { lineHeight: "20px", fontWeight: "500" }],
        body1: ["14px", { lineHeight: "24px", fontWeight: "500" }],
        body2: ["14px", { lineHeight: "24px", fontWeight: "500" }],
        body3: ["14px", { lineHeight: "20px", fontWeight: "500" }],
        body4: ["14px", { lineHeight: "20px", fontWeight: "500" }],
        body5: ["14px", { lineHeight: "20px", fontWeight: "500" }],
      },
      screens: {
        xxs: { max: "410px" },
        sm: { max: "650px" },
        xxm: { max: "720px" },
        md: { max: "780px" },
        xxlg: { max: "845px" },
        lg: { max: "960px" },
        xxl: { max: "1022px" },
        xxxl: { max: "1080px" },
      },
    },
    plugins: [],
  },
};
