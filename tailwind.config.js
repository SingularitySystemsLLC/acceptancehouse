module.exports = {
  content: [
    './index.html',
    './**/*.html',
    './**/*.js',
    './**/*.jsx',
    './**/*.ts',
    './**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        economica: ['Economica', 'sans-serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        'brand-primary-light': '#5692ba',
        'brand-primary-dark': '#1C2B62',
        'brand-secondary-dark': '#0B1127',
        'neutral-bg': '#f4ede4',
        'brand-accent': '#7A9D54',
        'brand-text': '#2F3C4F',
        'brand-primary-medium': '#2F3C4F',
        'accent-70': 'rgba(122,157,84,0.7)',
      },
    },
  },
  plugins: [],
}
