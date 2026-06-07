import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        axon: {
          bg:      '#fafaf8',
          fg:      '#1a1714',
          card:    '#ffffff',
          primary: '#9c7c52',
          stone:   '#7a5f3b',
          sec:     '#f2ede5',
          muted:   '#f5f1eb',
          'muted-fg': '#857669',
          accent:  '#e8dfd0',
          border:  'rgba(156,124,82,0.15)',
        },
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
