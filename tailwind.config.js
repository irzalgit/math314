module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',   // Semua file di folder pages
    './components/**/*.{js,ts,jsx,tsx}', // Semua file di folder components
    './src/app/**/*.{js,ts,jsx,tsx}',    // Untuk struktur app directory (Next.js 13+)
  ],
  theme: {
    extend: {
fontSize: {
        base: '16px', // Ubah>
      },
},
  },
  plugins: [],
};




