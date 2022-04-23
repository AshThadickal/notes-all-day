import { getInfo } from "./firebase.js"
getInfo()
const app = {}

app.init = () => {
    app.getQuote()  
    getInfo() 
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


app.init();