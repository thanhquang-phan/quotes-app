import { useState, useEffect } from 'react'
import { getDailyQuote, fetchRandomQuote } from './services/quoteService'

function App() {
  const [quote, setQuote] = useState({ content: "Loading inspiration...", author: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDailyQuote = async () => {
      setLoading(true);
      const daily = await getDailyQuote();
      setQuote(daily);
      setLoading(false);
    };
    loadDailyQuote();
  }, []);

  const handleNewQuote = async () => {
    setLoading(true);
    const newQuote = await fetchRandomQuote();
    setQuote(newQuote);
    setLoading(false);
  };

  return (
    <div className="glass-container">
      <h1>Daily Inspiration</h1>

      <div style={{ minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p style={{ fontSize: '1.2rem', fontStyle: 'italic', margin: '20px 0' }}>
              "{quote.content}"
            </p>
            <p style={{ opacity: 0.8 }}>- {quote.author}</p>
          </>
        )}
      </div>

      <button className="btn-glass" onClick={handleNewQuote} disabled={loading}>
        {loading ? 'Thinking...' : 'New Quote'}
      </button>
    </div>
  )
}

export default App
