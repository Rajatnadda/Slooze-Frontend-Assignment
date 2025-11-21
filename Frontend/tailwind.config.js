module.exports = {
  darkMode: "class", 
  
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f8ff",
          100: "#e6f0ff",
          500: "#2563eb"
        }
      },
      boxShadow: {
        soft: "0 6px 20px rgba(2,6,23,0.06)"
      }
    }
  },
  
  plugins: [],
};