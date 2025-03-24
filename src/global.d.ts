export {}; // Pastikan ini ada agar tidak bentrok dengan modul lain

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: () => Promise<void>;
    };
  }
}
