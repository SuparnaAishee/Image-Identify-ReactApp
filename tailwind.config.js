/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#38bdf8",
          secondary: "#e888cd",
          accent: "#c084fc",
          neutral: "#03061b",
          "base-100": "#ffffff",
        },
      },
      {
        dark: {
          primary: "#38bdf8",
          secondary: "#e888cd",
          accent: "#c084fc",
          neutral: "#03061b",
          "base-100": "#ffffff",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
