
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import dynamic from "next/dynamic";

// Load MathJax secara dinamis agar hanya dirender di client
const MathJax = dynamic(
() => import("better-react-mathjax").then((mod) => mod.MathJax),
{ ssr: false }
);
const MathJaxContext = dynamic(
() => import("better-react-mathjax").then((mod) => mod.MathJaxContext),
{ ssr: false }
);

// Konfigurasi Firebase
const firebaseConfig = {
apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

interface Question {
question: string;
options?: Record<string, string>;
}

const Soal: React.FC = () => {
const [questions, setQuestions] = useState<Record<string, Question>>({});
const [displayedQuestions, setDisplayedQuestions] = useState<Question[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [answers, setAnswers] = useState<Record<number, string[]>>({});
const [error, setError] = useState<string | null>(null);
const [renderKey, setRenderKey] = useState<number>(0); // Key untuk re-render
const router = useRouter();

useEffect(() => {
const fetchQuestions = async () => {
const questionsRef = ref(db, "questions");
try {
const snapshot = await get(questionsRef);
if (snapshot.exists()) {
const data = snapshot.val() as Record<string, Question>;
setQuestions(data);
setDisplayedQuestions(selectRandomQuestions(data, 5));
} else {
setError("Tidak ada data soal.");
setDisplayedQuestions([]);
}
} catch (err) {
setError("Gagal mengambil data soal.");
console.error(err);
} finally {
setLoading(false);
}
};

fetchQuestions();

}, []);

const selectRandomQuestions = (
allQuestions: Record<string, Question>,
count: number
): Question[] => {
const keys = Object.keys(allQuestions);
const shuffledKeys = keys.sort(() => Math.random() - 0.5).slice(0, count);
return shuffledKeys.map((key) => allQuestions[key]);
};

const handleAnswerChange = (questionIndex: number, optionKey: string) => {
setAnswers((prev) => {
const selectedAnswers = prev[questionIndex] || [];
return {
...prev,
[questionIndex]: selectedAnswers.includes(optionKey)
? selectedAnswers.filter((key) => key !== optionKey)
: [...selectedAnswers, optionKey],
};
});
};

const handleRenderUlang = () => {
setRenderKey((prevKey) => prevKey + 1); // Memaksa re-render
};

if (loading) return <p className="text-center py-4">Memuat soal...</p>;
if (error) return <p className="text-center py-4 text-red-500">{error}</p>;

return (
<MathJaxContext key={renderKey}>
<main className="container mx-auto p-4 relative">
<button  
onClick={handleRenderUlang}  
className="mb-2 px-4 py-2 bg-blue-500 text-white rounded"  
>
Render Ulang
</button>

{displayedQuestions.map((q, index) => (  
      <div key={index} className="mb-4">  
        {/* Menampilkan soal dalam MathJax */}  
        <div className="font-semibold">  
          <MathJax dynamic inline>{q.question || ""}</MathJax>  
        </div>  
        {q.options &&  
          Object.entries(q.options).map(([key, value]) => (  
            <label key={key} className="block flex items-center">  
              <input  
                type="checkbox"  
                checked={answers[index]?.includes(key) || false}  
                onChange={() => handleAnswerChange(index, key)}  
                className="mr-2"  
              />  
              <MathJax dynamic inline>{value || ""}</MathJax>  
            </label>  
          ))}  
      </div>  
    ))}  
  </main>  
</MathJaxContext>

);
};

export default Soal;

