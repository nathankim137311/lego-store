const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      'xxs': '.5rem',
      'xs': '.75rem',      
      'sm': '.875rem',          
      'base': '1rem',      
      'lg': '1.125rem',      
      'xl': '1.25rem',      
      '2xl': '1.5rem',      
      '3xl': '1.875rem',      
      '4xl': '2.25rem',      
      '5xl': '3rem',      
      '6xl': '4rem',      
      '7xl': '5rem',
    },
    borderWidth: {
      '1': '1px',
      '2': '2px',
      '3': '3px',      
      '4': '4px',      
      '6': '6px',
    },
    screens: {
      'xs': '360px',
      'sm': '575px', 
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
}
