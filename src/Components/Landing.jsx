import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
    "The best way to predict the future is to invent it. - Alan Kay",
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
    "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt"
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prevQuote) => (prevQuote + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?nature,water)' }}>
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg max-w-3xl text-center">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">Welcome to Our Site</h1>
        <p className="text-xl text-gray-700 mb-6 italic">{quotes[currentQuote]}</p>
        <div className="flex justify-center space-x-4">
          <button className="px-8 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
          <Link to="/dashboard" className="px-8 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-700 transition duration-300">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
