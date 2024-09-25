/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#101010",
        "text-headings": "#829bef",
        white: "#fff",
        secondary: "#49c8b7",
      },

      fontFamily: {
        madu: ['Madu', 'sans-serif'],
      },
      spacing: {},
      fontFamily: {
        body: "Roboto",
        "icon-medium": "'Material Icons'",
      },
      borderRadius: {
        "13xl": "32px",
      },
      width: {
        '150px': '150px',
        '200px': '200px',
      },
      screens: {
        sm: {'min': '640px'},
        md: {'min': '768px'},
        lg: {'min': '1024px'},
        xl: {'min': '1280px'},
      },
    },
    fontSize: {
      sm: "0.875rem",
      "5xl": "1.5rem",
      lgi: "1.188rem",
      xs: "0.75rem",
      base: "1rem",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },

   // tailwind.config.js code
   
};