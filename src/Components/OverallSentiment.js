import React from 'react';

const OverallSentiment = ({ sentiment }) => {
  const renderSentiment = () => {
    if (sentiment === null) {
      return <div className="text-muted text-center">Loading sentiment...</div>;
    }
    
    // Sentiment visualization logic
    let sentimentText = "Neutral";
    let sentimentColor = "#ffc107"; // Default neutral color

    if (sentiment > 75) {
      sentimentText = "Positive";
      sentimentColor = "#28a745"; // Green for positive
    } else if (sentiment < 25) {
      sentimentText = "Negative";
      sentimentColor = "#dc3545"; // Red for negative
    }

    return (
      <div className="text-center">
        <div className="h3" style={{ color: sentimentColor }}>
          {sentiment}% {sentimentText}
        </div>
        <p className="text-muted">Sentiment score for your topic</p>
      </div>
    );
  };

  return (
    <div className="col-md-6">
      <div className="card p-3 shadow-sm" style={{ width: '100%', height: '400px' }}>
        <h2 className="h6">Overall Sentiment</h2>
        <div className="py-3">{renderSentiment()}</div>
      </div>
    </div>
  );
};

export default OverallSentiment;
