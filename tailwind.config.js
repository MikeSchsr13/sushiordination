module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js}","./**/*.{html,js}"],
  theme: {
    extend: {
      letterSpacing:{
        'tracking-2em': '0.5em',
      },
      fontFamily:{
        'Inter': ['Inter','sans-serif'],
        'Comfortaa': ['Comfortaa','cursive']
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'white-0.5': 'rgba(255, 255, 255, 0.5)',
        'white-0.3': 'rgba(255, 255, 255, 0.3)',
        'rosa': '#ffc2c2',
        'mandarino': '#ffd7a8',
      },
    },
  },
  plugins: [],
}

