'use client';

import { callMenuSuggestionFlow } from '@/app/genkit';
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [menuItem, setMenuItem] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>("");

  const articles = [
    "Apa manfaat saya mempelajari matematika dalam menghadapi era kompetisi di dunia kerja  sekarang ini termasuk test cpns dan kedinasan  ",
    "Saya sedang mempersiapkan ujian akhir smk atau PAS atau ASAS bisakah kamu memberi prosedur cara belajar matematika yang efektif ",
    "Dapatkah kamu memberi ringkasan materi matematika untuk smk kurikulum merdeka ",
    "Jelaskan secara singkat kegunaan teori limit untuk pengembangan teori deferensial dan integralr",
    "Jelaskan secara singkat kegunaan materi matematika khususnya lingkaran di smk kejuruan jurusan teknik komputer jaringan , teknik sepeda motor , teknik geomatika ",
    "Berikan contoh soal tentang peluang dalam materi matematika kelas xi smk  terhadap 1 dadu sebanyak 15 soal yang  bervariasi berikut jawabannya",
    "Berikan saya penjelasan tentang hubungan garis singgung dengan turunan pertama , beri contoh soal dan jawabannya",
    "Dalam segiempat talibusur ABCD  , AC dan  BD  berpotongan di titik E didalam lingkaran. Tentukan besar sudut CED jika sudut pusat APD 100 derajat dan sudut pusat BPC 30 derajat. dimana P adalah titik pusat lingkaran",
  ];

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleDivClick = (content: string) => {
    setInputValue(content);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
    }
  };

  useEffect(() => {
    adjustTextareaHeight(); // Adjust height on initial render
  }, []);

  async function getMenuItem(formData: FormData) {
    const theme = formData.get('theme')?.toString() ?? '';
    const suggestion = await callMenuSuggestionFlow(theme);
    setMenuItem(suggestion);
  }

  return (
    <main>
      <form action={getMenuItem}>
        <label htmlFor="theme">
          Saya siswa SMK ingin tahu tentang matematika dengan tema:{' '}
        </label>
        <textarea
          value={inputValue}
          name="theme"
          id="theme"
          placeholder="silakan tulis apa pertanyaan mu?"
          onChange={handleInputChange}
          ref={textareaRef}
          className="p-2 border rounded-lg w-full max-w-md resize overflow-hidden"
          rows={1} // Start with one row
        />
          <button className="ml-5 bg-green-400  w-20" type="submit">
          Send
        </button>
        </form>
      
      <br />

      {/* Div dengan scrolling horizontal */}
      <div
        className="flex items-center gap-2 overflow-x-auto p-4 border rounded-lg"
        style={{ height: '300px' }}
      >
        {articles.map((article, index) => (
          <div
            key={index}
            className="p-2 border rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 flex-shrink-0"
            onClick={() => handleDivClick(article)}
            style={{
              width: '200px',
              height: '250px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <article className="whitespace-normal break-words">{article}</article>
          </div>
        ))}
      </div>

      <div className="m-2 p-2 bg-blue-200 text-xl">
        {menuItem ? (
          <ReactMarkdown>{menuItem}</ReactMarkdown>
        ) : (
          ' '
        )}
      </div>
    </main>
  );
}
