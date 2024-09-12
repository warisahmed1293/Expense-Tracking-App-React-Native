/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ICON_GREEN: "#408782",
        TEXT_GREEN: "#438883",
        DARK_GREEN: "#2F7E79",
        TRANS_RED: "#F95B51",
        TRANS_GREEN: "#25A969",
        PRIMARY_BLACK: "#222222",
        PRIMARY_GREY: "#666666",
      },
    },
  },
  plugins: [],
};

