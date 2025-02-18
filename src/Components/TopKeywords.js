import React from 'react';
import WordCloud from 'react-d3-cloud';

const TopKeywords = ({ keywords = [] }) => {
  const data = keywords.map(([text, value]) => ({ text, value: Number(value) * 100 })); // Adjust scaling factor for a reasonable size

  const fontSizeMapper = (word) => word.value;
  const rotate = () => 0; // No rotation for better alignment

  return (
    <div className="col-md-6">
      <div className="card p-3 shadow-sm" style={{ width: '100%', height: '400px' }}>
        <h2 className="h6">Top Keywords</h2>
        <div className="py-3" style={{ height: '300px', overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <WordCloud
              data={data}
              fontSizeMapper={fontSizeMapper}
              rotate={rotate}
              width={400} // Fixed width
              height={300} // Fixed height for the word cloud
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopKeywords;
