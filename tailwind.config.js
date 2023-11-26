/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
       custom: ["Roboto", "sans-serif"] 
      },
      backgroundImage: {
        'hero': "url('src/assets/large-landing.jpg')"
      },

    },
  },
  plugins: [],
}

