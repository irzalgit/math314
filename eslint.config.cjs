const nextConfig = require("eslint-config-next");

module.exports = [
  nextConfig,
  {
    rules: {
      "react/no-unescaped-entities": "off", // Contoh aturan tambahan
      "no-console": "warn", // Memberikan peringatan jika ada console.log
      "react-hooks/exhaustive-deps": "warn", // Peringatan jika dependencies useEffect kurang lengkap
    },
  },
];
