//connect html classes to js variables
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const  newQuoteBtn= document.getElementById("new-quote");
const loader = document.getElementById("loader");


let apiQuotes = [];

//show that its loading
function loading(){
    // if loader is shown quote conatiner isnt (and vice versa)
     loader.hidden = false;
     quoteContainer.hidden = true;
}

function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new quote
function newQuote(){
    loading();
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
    // Hide loader + set quote
    quoteText.textContent = quote.text;
    complete();
}


// Get Quotes From API
async function getQuotes() {
    loading();
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
