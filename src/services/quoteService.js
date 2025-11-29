const API_URL = 'https://api.quotable.io/random';

const FALLBACK_QUOTES = [
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { content: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin" },
    { content: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { content: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
];

export const getDailyQuote = async () => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('dailyQuoteDate');
    const storedQuote = localStorage.getItem('dailyQuote');

    if (storedDate === today && storedQuote) {
        return JSON.parse(storedQuote);
    }

    // Fetch new daily quote
    try {
        const quote = await fetchRandomQuote();
        localStorage.setItem('dailyQuote', JSON.stringify(quote));
        localStorage.setItem('dailyQuoteDate', today);
        return quote;
    } catch (error) {
        console.error("Failed to fetch daily quote, using fallback", error);
        // If API fails, use a deterministic fallback based on date
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        return FALLBACK_QUOTES[dayOfYear % FALLBACK_QUOTES.length];
    }
};

export const fetchRandomQuote = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return { content: data.content, author: data.author };
    } catch (error) {
        console.warn("API Error, using fallback:", error);
        return FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
    }
};
