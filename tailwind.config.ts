import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        apple: {
          blue:    '#0071e3',
          bluehov: '#0077ed',
          gray:    '#f5f5f7',
          dark:    '#1d1d1f',
          mid:     '#6e6e73',
          light:   '#86868b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
