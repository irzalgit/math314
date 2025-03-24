'use client';

import Link from 'next/link';

export default function SoalPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Halaman Soal</h1>
      <p>Ini adalah halaman soal yang akan menampilkan pertanyaan.</p>
      
      <Link href="/">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mt-4">
          Kembali ke Beranda
        </button>
      </Link>
    </main>
  );
}
