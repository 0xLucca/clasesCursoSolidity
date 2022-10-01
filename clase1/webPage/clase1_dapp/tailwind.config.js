/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        finanflixPurple: '#5328A7',
        finanflixWhite: '#DEDCE5',
        finanflixBlack: '#1A1A22',
        finanflixOrange: '#FF3F00',
      },
      fontFamily: {
        'sharpGrotesk-bold': ['SharpGrotesk-Bold10', 'sans-serif'],
        'sharpGrotesk-book20': ['SharpGrotesk-Book20', 'sans-serif'],
        'sharpGrotesk-book20': ['SharpGrotesk-Book25', 'sans-serif'],
        'sharpGrotesk-semibold': ['SharpGrotesk-SemiBold25', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
