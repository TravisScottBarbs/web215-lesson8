import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA4JAqedeDVe1rp7oYuasWaV5QIXy-YCiI",
  authDomain: "instagram-clone-eed5a.firebaseapp.com",
  databaseURL: "https://instagram-clone-23884.firebaseio.com",
  projectId: "instagram-clone-eed5a",
  storageBucket: "instagram-clone-eed5a.appspot.com",
  messagingSenderId: "269657468867",
  appId: "1:269657468867:web:c9bae94c38210e73bd5776"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
