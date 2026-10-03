/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#0b0f17',
          900: '#111827',
          800: '#1f2937',
          700: '#374151',
          600: '#4b5563',
          500: '#6b7280',
          300: '#d1d5db',
          100: '#f3f4f6',
          50: '#f9fafb',
        },
        sage: {
          900: '#1b3b2b',
          800: '#234e38',
          700: '#2c6146',
          600: '#357454',
          500: '#3e8863',
          400: '#5ba27e',
          300: '#83bd9f',
          200: '#b4d7c5',
          100: '#dceee3',
          50: '#f0f7f3',
        },
        manganese: {
          dark: '#1e2029',
          metallic: '#484d5c',
          slate: '#71788d',
          accent: '#2f855a',
          warning: '#c05621',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
