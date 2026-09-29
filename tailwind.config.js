/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Strict Brand Identity Color System
        royal: {
          bg: '#0B0704',          // Primary background
          section: '#1A0E06',     // Section background / dark espresso
          card: '#24150A',        // Card / surface background
          gold: '#F4B24D',        // Primary gold
          'gold-dark': '#D18B2C', // Royal gold / hover
          brown: '#4B2A12',       // Deep brown
          amber: '#F7C875',       // Warm amber
          cream: '#F6E6C9',       // Primary text / headings
          muted: '#D9C4A1',       // Secondary text
          red: '#8B1E1E',         // Rich red accent (used very sparingly)
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F7C875 0%, #F4B24D 45%, #D18B2C 100%)',
        'gold-gradient-hover': 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #B45309 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(36, 21, 10, 0.85) 0%, rgba(26, 14, 6, 0.95) 100%)',
      },
      boxShadow: {
        'gold-sm': '0 2px 10px rgba(244, 178, 77, 0.15)',
        'gold-md': '0 4px 20px rgba(244, 178, 77, 0.25)',
        'gold-lg': '0 10px 30px rgba(244, 178, 77, 0.35)',
        'card-glow': '0 8px 32px rgba(0, 0, 0, 0.45), 0 0 1px 1px rgba(244, 178, 77, 0.12)',
      },
    },
  },
  plugins: [],
}
