'use client';

import { callMenuSuggestionFlow } from '@/app/genkit';
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const [menuItem, setMenuItem] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const articles = [
    "Apa manfaat saya mempelajari matematika dalam menghadapi era kompetisi di dunia kerja sekarang ini termasuk test cpns dan kedinasan",
    "Saya sedang mempersiapkan ujian akhir smk atau PAS atau ASAS bisakah kamu memberi prosedur cara belajar matematika yang efektif",
    "Dapatkah kamu memberi ringkasan materi matematika untuk smk kurikulum merdeka",
    "Jelaskan secara singkat kegunaan teori limit untuk pengembangan teori deferensial dan integral",
    "Jelaskan secara singkat kegunaan materi matematika khususnya lingkaran di smk kejuruan jurusan teknik komputer jaringan, teknik sepeda motor, teknik geomatika",
    "Berikan contoh soal tentang peluang dalam materi matematika kelas xi smk terhadap 1 dadu sebanyak 15 soal yang bervariasi berikut jawabannya",
    "Berikan saya penjelasan tentang hubungan garis singgung dengan turunan pertama, beri contoh soal dan jawabannya",
    "Dalam segiempat talibusur ABCD, AC dan BD berpotongan di titik E didalam lingkaran. Tentukan besar sudut CED jika sudut pusat APD 100 derajat dan sudut pusat BPC 30 derajat. Dimana P adalah titik pusat lingkaran",
  ];

 
useEffect(() => {
  if (typeof window !== "undefined" && window.MathJax) {
    window.MathJax.typesetPromise?.().catch((err) => console.error("MathJax Error:", err));
  }
}, [menuItem]);
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    adjustTextareaHeight(event.target);
  };

  const handleDivClick = (article: string) => {
    setInputValue(article);
    textareaRef.current?.focus();
  };

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const theme = formData.get('theme')?.toString() ?? '';
    try {
      const suggestion = await callMenuSuggestionFlow(theme);
      setMenuItem(suggestion);
    } catch (error) {
      console.error('Failed to fetch menu suggestion:', error);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <form onSubmit={handleFormSubmit} className="mb-8">
        <label htmlFor="theme" className="block mb-2 text-lg font-medium">
          Saya siswa SMK ingin tahu tentang matematika dengan tema:
        </label>
        <div className="flex gap-4">
          <textarea
            value={inputValue}
            name="theme"
            id="theme"
            placeholder="Silakan tulis pertanyaanmu..."
            onChange={handleInputChange}
            ref={textareaRef}
            className="flex-1 p-2 border rounded-lg resize-none overflow-hidden focus:ring-2 focus:ring-blue-500"
            rows={1}
          />
          <button
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            type="submit"
          >
            Kirim
          </button>
        </div>
      </form>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Pertanyaan Contoh:</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {articles.map((article, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer flex-shrink-0 w-64 transition-colors"
              onClick={() => handleDivClick(article)}
            >
              <p className="text-sm line-clamp-6">{article}</p>
            </div>
          ))}
        </div>
      </div>

     

<button
  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
  onClick={() => router.push('/soal')} // Mengarahkan ke halaman soal.tsx
>
  Pergi ke Halaman Soal
</button>



      {menuItem && (
        <div className="p-6 bg-white rounded-lg shadow-md mt-6">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            components={{
              ol: ({ node, ...props }) => (
                <ol className="list-decimal list-inside space-y-4" {...props} />
              ),
              li: ({ node, ...props }) => <li className="mb-4 pl-2" {...props} />,
              p: ({ node, ...props }) => <p className="mb-2" {...props} />,
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-blue-600" {...props} />
              ),
            }}
          >
            {menuItem}
          </ReactMarkdown>
          <script
            type="text/javascript"
            id="MathJax-script"
            async
            src="https://polyfill.io/v3/polyfill.min.js?features=es6"
          ></script>
          <script
            type="text/javascript"
            async
            src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
          ></script>
        </div>
      )}
    </main>
  );
}
