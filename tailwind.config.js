const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        'notion-white': '#fffefc',
        'light-gray': '#e3e2e080',
        yellow: '#fdecc8',
        gray: '#e3e2e0',
        brown: '#eee0da',
        orange: '#fadec9',
        green: '#dbeddb',
        blue: '#d3e5ef',
        purple: '#e8deee',
        pink: '#f5e0e9',
        red: '#ffe2dd',
      },
      fontFamily: {
        sans: [
          'LyonText',
          'inter-var',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica',
          'Apple Color Emoji',
          'Arial',
          'sans-serif',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
