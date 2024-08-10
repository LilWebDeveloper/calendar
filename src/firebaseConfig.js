import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDriYqdxWf54HwCaLvIChyNDw5HMlzn_jU",
    authDomain: "tasks-63cbd.firebaseapp.com",
    databaseURL: "https://tasks-63cbd-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tasks-63cbd",
    storageBucket: "tasks-63cbd.appspot.com",
    messagingSenderId: "228154970759",
    appId: "1:228154970759:web:92aa314729bbba0254de22"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };