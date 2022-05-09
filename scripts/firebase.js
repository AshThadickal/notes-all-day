import { displayNotes } from "./app.js"

// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, get, push } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js'

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
    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            displayNotes(snapshot.val())
        } else {
            console.log(`didn't work`)
        }
    }).catch((error) => {
        console.log(error)
    })
} 

export const pushInfo = (obj) => {
    push(dbRef, obj);
}

export const auth = getAuth();
export const user = auth.currentUser;

const signedIn = () => {
    if (user) {
        console.log(user)
    } else {
        console.log('please sign in')
    }
}

export const createLogin = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message
        })

        // signedIn();
}

export const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
}



