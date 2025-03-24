import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import fs from "fs"; // Untuk membaca file dalam Node.js

const firebaseConfig = {
    apiKey: "AIzaSyCu4GQa-EOaPhpQP_y_QcsJxs05adQU2-M",
    authDomain: "math314-app.firebaseapp.com",
    projectId: "math314-app",
    storageBucket: "math314-app.firebasestorage.app",
    messagingSenderId: "9019551034",
    appId: "1:9019551034:web:de0c5e2b8b20c18ca0b403"
};
const firebase = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const storageRef = ref(storage, "data.json");

async function uploadFile() {
    const file = fs.readFileSync("data.json");
    await uploadBytes(storageRef, file);
    console.log("File data.json berhasil diunggah ke Firebase Storage!");
}

uploadFile();

