import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
<<<<<<< HEAD
      animation: {
        draw: 'draw 1.5s ease-in-out infinite',
      },
      keyframes: {
        draw: {
          '0%': { width: '0%' },
          '50%': { width: '50%' },
          '100%': { width: '100%' },
        },
=======
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
>>>>>>> 76a2140f7c3eb05a5f8cf3e66e4dfe92a1d77f15
      },
      colors: {
        // Primary Colors
        primary: 'var(--primary-color)',
        'primary-hover': 'var(--primary-hover-color)',
        'primary-100': 'var(--primary-100)',
        'primary-200': 'var(--primary-200)',
        'primary-300': 'var(--primary-300)',

        // Secondary Colors
        secondary: 'var(--secondary-color)',
        'secondary-hover': 'var(--secondary-hover-color)',
        'secondary-100': 'var(--secondary-100)',
        'secondary-200': 'var(--secondary-200)',
        'secondary-300': 'var(--secondary-300)',

        // Grayscale
        'grayscale-900': 'var(--gray-900)',
        'grayscale-800': 'var(--gray-800)',
        'grayscale-700': 'var(--gray-700)',
        'grayscale-600': 'var(--gray-600)',
        'grayscale-500': 'var(--gray-500)',
        'grayscale-400': 'var(--gray-400)',
        'grayscale-300': 'var(--gray-300)',
        'grayscale-200': 'var(--gray-200)',
        'grayscale-100': 'var(--gray-100)',
        'grayscale-50': 'var(--gray-50)',

        // Additional Colors
        'etc-white': 'var(--white)',
        'etc-red': 'var(--red)',
        'etc-cream': 'var(--cream)',
        'etc-blue': 'var(--blue)',
        'etc-yellow': 'var(--yellow)',
      },
      fontSize: {
        // Title
        'title-xl': ['24px', '135%'],
        'title-lb': ['20px', '135%'],
        'title-lm': ['20px', '135%'],
        'title-mb': ['16px', '135%'],
        'title-mm': ['16px', '135%'],
        'title-sb': ['12px', '135%'],

        // Body
        'body-lm': ['24px', '150%'],
        'body-mm': ['16px', '150%'],
        'body-sm': ['12px', '150%'],

        // Label
        'label-xlm': ['20px', '150%'],
        'label-lm': ['16px', '150%'],
        'label-mb': ['12px', '150%'],
        'label-mm': ['12px', '150%'],
        'label-sb': ['10px', '150%'],
        'label-sm': ['10px', '150%'],

        // Caption
        'caption-lm': ['16px', '150%'],
        'caption-mm': ['12px', '150%'],
        'caption-sm': ['10px', '150%'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
