module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-bottom-up": {
          '0%': { bottom: '-100%' },
          '100%': { bottom: '0' },
        }
      },
      animation: {
        "slide-bottom-up": 'slide-bottom-up 400ms ease-in-out forwards',
      }
    },
  },
  plugins: [],
}
