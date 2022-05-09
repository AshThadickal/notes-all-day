import { getInfo, pushInfo, createLogin, signIn } from "./firebase.js"

const app = {}

app.init = () => {
    app.getQuote()  
    app.handleSubmit()
    getInfo() 
    app.userSignup()
}

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

// event listener to gather note and push to firebase
app.handleSubmit = () => {
    $('.newNoteForm').on('submit', (e) => {
        e.preventDefault();
        
        const noteObj = {
            date: '',
            title: '',
            note: ''
        }
        noteObj.date = $('.date')[0].value;
        noteObj.title = $('.title')[0].value;
        noteObj.note = $('.note')[0].value;

        pushInfo(noteObj)
        $('.date')[0].value = '0';
        $('.title')[0].value = '';
        $('.note')[0].value = '';
    })
}

// method to display saved notes 
export const displayNotes = (results) => {
    // take the returned notes and display
    const container = $('.savedContainer');
    for(let key in results) {
        container.append(`<div class='col'><p>${results[key].date}</p>
        <p>${results[key].title}</p>
        <p>${results[key].note}</p>`)
    }
}

app.userSignup = () => {
    $('.signupForm').on('submit', (e) => {
        e.preventDefault();
        
        // const user = $('#user')[0].value
        const userEmail = $('#email')[0].value
        const userPassword = $('#password')[0].value

        createLogin(userEmail, userPassword)

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