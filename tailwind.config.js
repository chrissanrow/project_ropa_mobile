/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto_400Regular",
        primary: "Roboto_600SemiBold",
        secondary: "RobotoSlab_400Regular",
        text: "Roboto_400Regular",
        accent: "Roboto_500Medium",
      },
      colors: {
        textprimary: "#030014",
        textsecondary: "#151312",
        primary: "#224869",
        secondary: "#FD7646",
        lightprimary: {
          100: "#bcc8d2",
          200: "#93a4b4",
          300: "#6b8196"
        },
        lightsecondary: {
          100: "#fecebd",
          200: "#feae93",
          300: "#fd8f68"
        },
        darkprimary: {
          100: "#1a3e5f",
          200: "#163552",
          300: "#132539"
        },
        background: "#e5e9ec"
      }
    },
  },
  plugins: [],
}