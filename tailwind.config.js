/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        // Bounces 5 times 1s equals 5 seconds
        'fade-in': 'fade-in 1s ease-in-out 1',
        'fade-out':'fade-out 1s ease-in-out 1'
      },
      transition:{
          'height':'height 1s ease-in-out',
        }
      
    },

    
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar'),
  ],
}

