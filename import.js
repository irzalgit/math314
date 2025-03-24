const admin = require('firebase-admin');
const data = require('./data.js');

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

async function importData() {
  // Sesuaikan dengan struktur data.js
  for (const [collectionName, documents] of Object.entries(data)) {
    const collectionRef = db.collection(collectionName);
    for (const doc of documents) {
      await collectionRef.add(doc);
    }
  }
  console.log("Data berhasil diimpor!");
}

importData();
