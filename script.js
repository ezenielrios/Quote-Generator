const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []; // comment out if using local file for quotes

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading spinner
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true
}


// Show new Quote
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];// changeout apiQuotes with localQuotes if using local file
    //  Check if Author field is blank and replace with "Unknown"
    if (!quote.author) {
        autherText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //  Check Quote length to determine the styling
    if (quote.text.length >120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote , Hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl ='https://type.fit/api/quotes';
    try {
        const responce = await fetch(apiUrl);
        apiQuotes =await responce.json();
        newQuote();
    } catch (error) {
        alert(error)
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.text}`
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();

// newQuote(); if using local file
