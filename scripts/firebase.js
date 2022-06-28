// import { displayNotes } from "./app.js"

// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, get, push } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js';

const app = {}

app.init = () => {
    app.getQuote()
    app.handleSubmit()
    // getInfo() 
    app.userSignup()
    app.monitorAuthState()
}

// Your web app's Firebase configuration
app.firebaseConfig = {
    apiKey: "AIzaSyB-YqDcdIaWEM9f7_pwoMnlpTlldyp026k",
    authDomain: "notesfordays-7e0c5.firebaseapp.com",
    databaseURL: "https://notesfordays-7e0c5-default-rtdb.firebaseio.com",
    projectId: "notesfordays-7e0c5",
    storageBucket: "notesfordays-7e0c5.appspot.com",
    messagingSenderId: "730014987321",
    appId: "1:730014987321:web:522040a21face3045b89e8"
};

// Initialize Firebase
app.firebase = initializeApp(app.firebaseConfig);
app.database = getDatabase(app.firebase)
app.dbRef = ref(app.database)

// gets the current info in firebase
app.getInfo = () => {
    get(app.dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            displayNotes(snapshot.val())
        } else {
            console.log(`didn't work`)
        }
    }).catch((error) => {
        console.log(error)
    })
} 

// pushes user info to firebase
app.pushInfo = (obj) => {
    push(app.dbRef, obj);
}

// Authorization
app.auth = getAuth();
app.user = app.auth.currentUser;

// create a user login
app.createAccount = async() => {
    const email = $('#emailSignup')[0].value;
    const password = $('#passwordSignup')[0].value;
    const displayName = $('#userSignup')[0].value;
    
    try{
        const res = await createUserWithEmailAndPassword(app.auth, email, password)
        const user = {
            name: displayName,
            email: res.user.email,
            notes: {
                date: '',
                title: '',
                note: ''
            },
            userID: res.user.uid,
        } 

        app.pushInfo(user)

        }
    catch(error) {
        console.log(`There was an error: ${error}`)
    }
}

// sign in
app.signIn = async() => {
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


// function for if user is signed in (do I need to get the specific user ID from realtime database and call push the notes informaiton here?)
app.monitorAuthState = async() => {
    onAuthStateChanged(app.auth, (user) => {
        const uid = user.uid;
        if (user) {
            
            console.log(uid, 'you are signed in')
            // push(dbRef, uid)
            app.handleSubmit(uid)
            return uid
            // is user is signed in then I want the notes to be specific to their login only
        } 
        else {
            console.log('user is signed out')
            // user is signed out
        }
        
    })
    
}

// I don't think I need this.
// const addToDataBase = (userId) => {
//     firebase.database().ref(userId).once('value').then(function(snapshot){
//         console.log(snapshot)
//     })

// }

app.logout = async () => {
    await signOut(app.auth)
}

// user profile information - do I need this?
app.userProfile = () => {
    if(user !== null) {
        const userDetails = {
            displayName: user.displayName,
            email: user.email,
            uid: user.id
        }

    }
}

// app.userID = app.monitorAuthState();

app.randomizer = (array) => {
    const index = Math.floor(Math.random() * array.length);
    const ramdomObj = array[index]
    return ramdomObj
}

app.getQuote = () => {
    $.ajax({
        url: 'https://type.fit/api/quotes',
        method: 'GET',
        dataType: 'JSON'
    }).then(res => {
        const theObj = app.randomizer(res)
        app.displayQuote(theObj)
    })
}

app.displayQuote = (quoteObj) => {
    const quoteDisplay = `<p>${quoteObj.text}</p>
    <p>Author: ${quoteObj.author}`
    $('.welcome').prepend(quoteDisplay)
}

app.pushNote = (obj, userID) => {
    // need to differentiate which user the note belongs too first
    // grab the database that is specific to that userID
    const dbRef = ref(app.database, `/${userID}`);
    const newNoteObj = ///
    push(dbRef, obj)
}
// event listener to gather note and push to firebase
app.handleSubmit = (userID) => {
    // NEED TO DO A SEARCH IN THE DATABASE AND SEE IF THE USER ID IS THERE AND IF SO, LINK IT TO THAT USER'S OBJECT
    console.log(userID)
    $('.newNoteForm').on('submit', (e) => {
        e.preventDefault();  

        // const noteObj = {
        //     date: '',
        //     title: '',
        //     note: ''
        // }
        // noteObj.date = $('.date')[0].value;
        // noteObj.title = $('.title')[0].value;
        // noteObj.note = $('.note')[0].value;

        notes.date = $('.date')[0].value;
        notes.title = $('.title')[0].value;
        notes.note = $('.note')[0].value;

        app.pushNote(noteObj, userID)
        $('.date')[0].value = '0';
        $('.title')[0].value = '';
        $('.note')[0].value = '';
        
    })
}

// method to display saved notes 
// export const displayNotes = (results) => {
//     // take the returned notes and display
//     const container = $('.savedContainer');
//     for(let key in results) {
//         container.append(`<div class='col'><p>${results[key].date}</p>
//         <p>${results[key].title}</p>
//         <p>${results[key].note}</p>`)
//     }
// }

app.userSignup = () => {
    $('.signupForm').on('submit', (e) => {
        e.preventDefault();
        app.createAccount();
    })
}

app.userSignin = () => {
    $('.loginForm').on('submit', e => {
        e.preventDefault();

        const userEmail = $('#loginEmail')[0].value
        const userPassword = $('#loginPassword')[0].value

        console.log(userEmail, userPassword)

        signIn(userEmail, userPassword)
    })
}

app.init();
