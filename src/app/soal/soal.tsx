"use client";

import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Konfigurasi Firebase yang diperbaiki
const firebaseConfig = {
  apiKey: "AIzaSyCu4GQa-EOaPhpQP_y_QcsJxs05adQU2-M",
  authDomain: "math314-app.firebaseapp.com",
  databaseURL: "https://math314-app-default-rtdb.firebaseio.com", // Tambahkan databaseURL
  projectId: "math314-app",
  storageBucket: "math314-app.appspot.com",
  messagingSenderId: "9019551034",
  appId: "1:9019551034:web:de0c5e2b8b20c18ca0b403"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Type untuk struktur data soal
interface Question {
  question: string;
  options: {
    [key: string]: string;
  };
  correctAnswers: string[];
}

const Soal: React.FC = () => {
  const [questions, setQuestions] = useState<{ [key: string]: Question }>({});
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionsRef = ref(db, "questions");
      try {
        const snapshot = await get(questionsRef);
        if (snapshot.exists()) {
          setQuestions(snapshot.val());
        } else {
          console.log("Tidak ada data soal.");
        }
      } catch (error) {
        console.error("Gagal mengambil data soal:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionKey: string, optionKey: string) => {
    setAnswers((prev) => {
      const selectedAnswers = prev[questionKey] || [];
      if (selectedAnswers.includes(optionKey)) {
        return {
          ...prev,
          [questionKey]: selectedAnswers.filter((key) => key !== optionKey),
        };
      } else {
        return {
          ...prev,
          [questionKey]: [...selectedAnswers, optionKey],
        };
      }
    });
  };

  if (loading) return <p className="text-center py-4">Memuat soal...</p>;

  return (
    <main className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Daftar Soal</h2>
      {Object.keys(questions).length === 0 ? (
        <p className="text-center">Tidak ada soal tersedia</p>
      ) : (
        Object.keys(questions).map((key) => {
          const question = questions[key];
          return (
            <div
              key={key}
              className="mb-6 p-4 border rounded-lg bg-white shadow-md"
            >
              <p className="font-medium text-lg mb-3">{question.question}</p>
              <div className="space-y-2">
                {Object.keys(question.options).map((optionKey) => (
                  <label
                    key={optionKey}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={answers[key]?.includes(optionKey) || false}
                      onChange={() => handleAnswerChange(key, optionKey)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="text-gray-700">
                      {question.options[optionKey]}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })
      )}
    </main>
  );
};

export default Soal;