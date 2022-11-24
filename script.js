//connect html classes to js variables
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const  newQuoteBtn= document.getElementById("new-quote");



let apiQuotes = [];

//Show new quote
function newQuote(){
    //get random int for array of quotes 
    let index = Math.floor(Math.random() * apiQuotes.length);
    let quote = apiQuotes[index];

    //replace txt content with selected quote content
    authorText.textContent = quote.author;
    quoteText.textContent = quote.text;

    //in case there is no author
    if(!quote.author){
       authorText.textContent = "Anonymous";
    }else{
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling 
    if(quote.text.length > 120){
        //adds a css class
        quoteText.classList.add("long-quote");
    }else{
        quoteText.classList.remove("long-quote");
    }

    quoteText.textContent = quote.text;
}


// Get Quotes From API
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    }catch(error){
        console.log("something broke :(")
        // Catch Error here
        // send notif to me etc.
    }
 }

// Twit button
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text="${quoteText.textContent}" - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event listeners
//makes buttons respond
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);





    // On Load
    getQuotes();
