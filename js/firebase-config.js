import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';

const firebaseConfig = {
    apiKey: "AIzaSyBphL-F6DZhDrBY49K7SsMebBYSlWoQ9K4",
    authDomain: "teambrunao-63fa2.firebaseapp.com",
    projectId: "teambrunao-63fa2",
    storageBucket: "teambrunao-63fa2.firebasestorage.app",
    messagingSenderId: "518397572811",
    appId: "1:518397572811:web:584c8ae32315656a388d4e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
