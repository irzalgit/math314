import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

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

const questions = {
  q1: {
    question: "Berapakah hasil dari $$2 + 3$$?",
    options: {
      a: "$$4$$",
      b: "$$5$$",
      c: "$$6$$",
      d: "$$7$$"
    },
    correct_answers: ["b"]
  },
  q2: {
    question: "2Jika $$x = 4$$, berapakah nilai $$3x - 2$$?",
    options: {
      a: "$$10$$",
      b: "$$11$$",
      c: "$$12$$",
      d: "$$14$$"
    },
    correct_answers: ["b"]
  },
  q3: {
    question: "Berapakah hasil dari $$\\frac{8}{4} + 2$$?",
    options: {
      a: "$$4$$",
      b: "$$5$$",
      c: "$$6$$",
      d: "$$7$$"
    },
    correct_answers: ["a"]
  },
  q4: {
    question: "Hitunglah $$\\int (3x^2 + 2x + 1) \\,dx$$.",
    options: {
      a: "$$x^3 + x^2 + x + C$$",
      b: "$$x^3 + 2x^2 + x + C$$",
      c: "$$x^3 + x^2 + 2x + C$$",
      d: "$$x^3 + 2x^2 + 2x + C$$"
    },
    correct_answers: ["b"]
  },
  q5: {
    question: "Hitunglah $$\\frac{3}{4} + \\frac{5}{8}$$.",
    options: {
      a: "$$\\frac{19}{16}$$",
      b: "$$\\frac{21}{16}$$",
      c: "$$\\frac{22}{16}$$",
      d: "$$\\frac{23}{16}$$"
    },
    correct_answers: ["b"]
  }
};

// Menambahkan pertanyaan ke Firebase
Object.entries(questions).forEach(([id, data]) => addQuestion(id, data));

// Fungsi untuk menambahkan pertanyaan ke database
function addQuestion(questionId, questionData) {
  set(ref(db, "questions/" + questionId), questionData)
    .then(() => console.log(`Pertanyaan ${questionId} berhasil ditambahkan`))
    .catch((error) => console.error("Error:", error));
}