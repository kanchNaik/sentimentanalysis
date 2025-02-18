import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import OverallSentiment from './OverallSentiment';
import TopKeywords from './TopKeywords';
import SentimentTrend from './SentimentTrend';

const Home = () => {
  const [sentimentData, setSentimentData] = useState(null);
  const [keyword, setKeyword] = useState("");

  const fetchSentiment = async () => {
    if (!keyword) {
      console.error("Please enter a keyword or product ID");
      return; // Prevents API call if no keyword is entered
    }

    try {
      console.log("Fetching sentiment for", keyword);
      const response = await fetch(`http://localhost:5000/sentiment/${keyword}`, {  // Use keyword in URL
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setSentimentData(data); // Update sentiment state with API response
    } catch (error) {
      console.error("Error fetching sentiment:", error);
    }
  };

  const getOverallSentiment = () => {
    if (sentimentData && sentimentData.overall_sentiment) {
      const sentiment = sentimentData.overall_sentiment;
      const sentimentKey = Object.keys(sentiment)[0];  // Get the first key (e.g., '1')
      return sentiment[sentimentKey];  // Return the corresponding sentiment value (e.g., 100.0)
    }
    return null;
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        {/* Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between mb-4">
          <div>
            <h1 className="h4">Sentiment Dashboard</h1>
            <p className="text-muted">Find out how your topic is perceived online</p>
          </div>

          {/* Controls */}
          <div className="d-flex flex-column gap-2">
            <div className="d-flex gap-2 align-items-center">
              <input 
                type="text" 
                placeholder="Enter topic or keyword" 
                className="form-control w-auto"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)} // Update keyword state
              />
              
              <select className="form-select w-auto">
                <option value="30days">Last 30 days</option>
                <option value="7days">Last 7 days</option>
                <option value="24hours">Last 24 hours</option>
              </select>
              
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary">🔍</button>
                <button className="btn btn-outline-secondary">📥</button>
                <button className="btn btn-outline-secondary">🔗</button>
              </div>
            </div>
            <button className="btn btn-primary w-100" onClick={fetchSentiment}>Get Sentiment</button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="row g-3">
          {/* Overall Sentiment */}
          {sentimentData && getOverallSentiment() !== null && (
            <OverallSentiment sentiment={getOverallSentiment()} />
          )}
           {/* Top Keywords */}
           {sentimentData && sentimentData.trending_keywords && (
            <TopKeywords keywords={sentimentData.trending_keywords} />
          )}

          {/* Sentiment Trend */}
          {sentimentData && sentimentData.sentiment_trend && (
            <SentimentTrend trendData={sentimentData.sentiment_trend} />
          )}
          
         
          
          {/* Reviews */}
          {sentimentData && sentimentData.reviews && (
            <div className="mt-4">
              <h5>Reviews</h5>
              <ul className="list-unstyled">
                {sentimentData.reviews.map((review, index) => (
                  <li key={index} className="border-bottom pb-3 mb-3">
                    <p><strong>Review Date:</strong> {review.review_date}</p>
                    <p><strong>Sentiment:</strong> {review.predicted_sentiment === 1 ? "Positive" : "Negative"}</p>
                    <p><strong>Review:</strong> {review.review_body}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
