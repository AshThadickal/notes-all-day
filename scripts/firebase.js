// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, get } from 'https://www.gstatic.com/firevasejs/9.6.11/firebase-database.js'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-YqDcdIaWEM9f7_pwoMnlpTlldyp026k",
    authDomain: "notesfordays-7e0c5.firebaseapp.com",
    databaseURL: "https://notesfordays-7e0c5-default-rtdb.firebaseio.com",
    projectId: "notesfordays-7e0c5",
    storageBucket: "notesfordays-7e0c5.appspot.com",
    messagingSenderId: "730014987321",
    appId: "1:730014987321:web:522040a21face3045b89e8"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase)
const dbRef = ref(database)

export const getInfo = () => {
    console.log('wtf')

    // get(dbRef).then((snapshot) => {
    //     if (snapshot.exists()) {
    //         console.log(snapshot.val())
    //     } else {
    //         console.log(`didn't work`)
    //     }
    // }).catch((error) => {
    //     console.log(error)
    // })
} 