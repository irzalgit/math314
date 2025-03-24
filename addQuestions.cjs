const firebase = require("firebase");

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const firebase = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyCu4GQa-EOaPhpQP_y_QcsJxs05adQU2-M",
    authDomain: "math314-app.firebaseapp.com",
    projectId: "math314-app",
    storageBucket: "math314-app.firebasestorage.app",
    messagingSenderId: "9019551034",
    appId: "1:9019551034:web:de0c5e2b8b20c18ca0b403"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const questions = {
  q1: {
    question: "Berapakah hasil dari 2 + 3?",
    options: {
      a: "4",
      b: "5",
      c: "6",
      d: "7"
    },
    correct_answers: ["b"]
  },
  q2: {
    question: "Jika x = 4, berapakah nilai 3x - 2?",
    options: {
      a: "10",
      b: "11",
      c: "12",
      d: "14"
    },
    correct_answers: ["b"]
  }
};

db.ref("questions").set(questions)
  .then(() => {
    console.log("Soal berhasil ditambahkan!");
    process.exit();
  })
  .catch((error) => {
    console.error("Error menambahkan soal:", error);
  });

