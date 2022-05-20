module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'primary': '#0A0A0A', //nero
      'secondary': '#5A83EC', //violetto
      'tertiary': '#2F3737', //grigio
      'quaternary': '#D2F6F6', //azzurro
      'neutral': '#FDFFFC', //bianco
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    },
    extend: {
      fontSize: {
        '3s': '0.422rem',
        '2s': '0.563rem',
        '1s': '0.75rem',
        '0x': '1rem',
        '1x': '1.333rem',
        '2x': '1.777rem',
        '3x': '2.369rem',
        '4x': '3.157rem',
        '5x': '4.209rem',
      },
      gridTemplateRows: {
        '8': 'repeat(8, minmax(0, 1fr))',
        '10': 'repeat(10, minmax(0, 1fr))'
      }
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === 'string'
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    },
  ],
}

