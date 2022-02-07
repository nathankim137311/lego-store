const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  variants: {
    borderWidth: ['first', 'responsive'],
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      'xxs': '.5rem',
      'xs': '.65rem',      
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
      'xxs': '320px',
      'xs': '575px', 
      'smd': '500px',
      ...defaultTheme.screens,
    },
    extend: {
      lineHeight: {
        '12': '3rem',
      },
      maxWidth: {
        '8xl': '96rem',
      },
      width: {
        '124': '31rem',
        '384': '96rem',
      },
      maxHeight: {
        '152': '38rem',
      },
      height: {
        '152': '38rem',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
