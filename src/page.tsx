'use client';

import { callMenuSuggestionFlow } from '@/app/genkit';
import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function Home() {
  const [menuItem, setMenuItem] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const articles = [
    'Linear equations in daily life',
    'Geometry in architecture',
    'Statistics in business',
  ];

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

      {menuItem && (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
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
        </div>
      )}
    </main>
  );
}
