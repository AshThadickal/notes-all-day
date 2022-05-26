// import { displayNotes } from "./app.js"

// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, get, push } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js'

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

// gets the current info in firebase
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

// pushes data to firebase (currenlty is the notes)
export const pushInfo = (obj) => {
    push(dbRef, obj);
}

// Authorization
export const auth = getAuth();
export const user = auth.currentUser;

// create a user login

export const createAccount = async() => {
    const email = $('#emailSignup')[0].value;
    const password = $('#passwordSignup')[0].value;
    const displayName = $('#userSignup')[0].value;
    
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = {
            name: displayName,
            email: res.user.email,
            userID: res.user.uid
        } 

        pushInfo(user)

        }
    catch(error) {
        console.log(`There was an error: ${error}`)
    }

}


// export const createLogin = (email, password, userName) => {
//       createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // const user = {
//             //     userID: userCredential.user.uid,
//             //     userEmail: email,
//             //     userName: userName,
//             //     notes: {}
//             // }
//             const user = userCredential.user.uid
//             console.log(user)
//             push(dbRef, user)
            
//             // push to database with ref `/${user}`
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message
//         })
// }

// sign in
export const signIn = async() => {
    const loginEmail = $('#loginEmail')[0].value;
    const loginPassword = $('#loginPassword')[0].value;

    try {
        await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        pushInfo()
    }
    catch(error) {
        console.log(`There was an Error: ${error}`)
    }
}


// function for if user is signed in (do I need to get the specific user ID from realtime database and call oush the notes informaiton here?)
export const monitorAuthState = async() => {
    onAuthStateChanged(auth, (user) => {
        const uid = user.uid;
        if (user) {
            
            console.log(uid, 'you are signed in')
            // push(dbRef, uid)
            return uid
            // is user is signed in then I want the notes to be specific to their login only
        } 
        else {
            console.log('user is signed out')
            // user is signed out
        }
        
    })
    
}

const addToDataBase = (userId) => {
    firebase.database().ref(userId).once('value').then(function(snapshot){
        console.log(snapshot)
    })

}

export const logout = async () => {
    await signOut(auth)
}

// user profile information - do I need this?
export const userProfile = () => {
    if(user !== null) {
        const userDetails = {
            displayName: user.displayName,
            email: user.email,
            uid: user.id
        }

    }
}


