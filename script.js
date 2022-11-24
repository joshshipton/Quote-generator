//connect html classes to js variables
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("said");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn= document.getElementById("new-quote");
const loader = document.getElementById("loader");

loading();

import data from './quotes.json' assert {type: 'json'};
console.log(data);
//loading();

const apiQuotes = data;

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
    //should = apiquotes.length
    let index = Math.floor(Math.random() * data.length);
    console.log(index)
    let quote = apiQuotes[index];
    console.log(quote);

    //replace txt content with selected quote content
    authorText.textContent = quote.source;
    quoteText.textContent = quote.quote;

    // Check Quote length to determine styling 
    //if(said.quote.length > 120){
        //adds a css class
        //quoteText.classList.add("long-quote");
    //}else{
        //quoteText.classList.remove("long-quote");
    //}
    // Hide loader + set quote
    complete();
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
//getQuotes();
newQuote();