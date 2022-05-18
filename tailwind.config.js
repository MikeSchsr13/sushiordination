module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js}","./public/**/*.{html,js}"],
  theme: {
    extend: {
      letterSpacing:{
        'tracking-2em': '0.5em',
      },
      fontFamily:{
        'Inter': ['Inter','sans-serif']
      },
    },
  },
  plugins: [],
}

