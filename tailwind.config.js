/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,vue}"],
  extend: {
    colors: {
      "button-purple": "#6c63ff",
      "button-dark-purple": "#3f3d56",
    },
    gradientColorStops: (theme) => ({
      ...theme("colors"),
      "purple-start": "#6c63ff",
      "purple-end": "#3f3d56",
    }),
  },
  plugins: [],
};
