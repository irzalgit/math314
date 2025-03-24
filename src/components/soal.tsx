import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCu4GQa-EOaPhpQP_y_QcsJxs05adQU2-M",
  authDomain: "math314-app.firebaseapp.com",
  projectId: "math314-app",
  storageBucket: "math314-app.firebasestorage.app",
  messagingSenderId: "9019551034",
  appId: "1:9019551034:web:de0c5e2b8b20c18ca0b403"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const Soal: React.FC = () => {
  const [questions, setQuestions] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(true);

  // Ambil data soal dari database
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

  if (loading) return <p>Memuat soal...</p>;

  return (
    <div>
      <h2>Daftar Soal</h2>
      {Object.keys(questions).map((key) => {
        const question = questions[key];
        return (
          <div key={key} style={{ marginBottom: "20px" }}>
            <p><strong>{question.question}</strong></p>
            {Object.keys(question.options).map((optionKey) => (
              <label key={optionKey} style={{ display: "block" }}>
                <input type="radio" name={key} value={optionKey} />{" "}
                {question.options[optionKey]}
              </label>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Soal;
