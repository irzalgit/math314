const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Pastikan file ini ada

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://math314-app.firebaseio.com" // Ganti dengan URL proyek
});

const db = admin.firestore();
const data = require("./data.js"); // Pastikan file data.js ada di direktori

async function uploadData() {
  const collectionRef = db.collection("math-data");
  for (let key in data) {
    await collectionRef.doc(key).set(data[key]);
    console.log(`Uploaded: ${key}`);
  }
}

uploadData().then(() => console.log("Upload selesai!"));
