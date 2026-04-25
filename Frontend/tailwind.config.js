/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {

    extend: {
      fontFamily: {
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'monospace'],
      },
      colors: {
        'anthropic-black': '#141413',
        'terracotta': '#c96442',
        'coral': '#d97757',
        'error-crimson': '#b53333',
        'focus-blue': '#3898ec',
        'parchment': '#f5f4ed',
        'ivory': '#faf9f5',
        'warm-sand': '#e8e6dc',
        'dark-surface': '#30302e',
        'deep-dark': '#141413',
        'charcoal-warm': '#4d4c48',
        'olive-gray': '#5e5d59',
        'stone-gray': '#87867f',
        'dark-warm': '#3d3d3a',
        'warm-silver': '#b0aea5',
        'border-cream': '#f0eee6',
        'border-warm': '#e8e6dc',
        'border-dark': '#30302e',
      },
      boxShadow: {
        'ring-warm': '0px 0px 0px 1px #d1cfc5',
        'ring-subtle': '0px 0px 0px 1px #dedc01',
        'ring-deep': '0px 0px 0px 1px #c2c0b6',
        'whisper': '0px 4px 24px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'comfort': '8px',
        'generous': '12px',
        'featured': '16px',
        'hero': '32px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}