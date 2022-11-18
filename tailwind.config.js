module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navBg: "#22331d",
        bodyBg: "#f1ede7",
        navSearchBg: "#141c10",
        cardBg: "#fff",
        cardButtonBg: "#697a65",
        cardcardButtonText: "#fff",
        cardTextPrimary: "#000",
        cardTextSecondary: "#697a65",
      },
      spacing: {
        hNavPad: "4rem",
        vNavPad: "1.3rem",
      },
      fontFamily: {
        krona: ["Krona One", "sans-serif"],
      },
    },
  },
  plugins: [],
};
