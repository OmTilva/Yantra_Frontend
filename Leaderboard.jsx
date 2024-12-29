// Leaderboard.jsx
import React from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const data = [
    { rank: 1, accountId: 'Blah1' },
    { rank: 2, accountId: 'Blah2' },
    { rank: 3, accountId: 'Blah3' },
    { rank: 4, accountId: 'Blah4' },
    { rank: 5, accountId: 'Blah5' },
  ];

  return (
    <div className="leaderboard-container">
      <div className="leaderboard">
        <h1 className="leaderboard-title">LEADERBOARD</h1>
  
        <div className="container">
            <div className="table">
              <div className="table-header">
                <div className="header-cell">RANK</div>
                <div className="header-cell">ACCOUNT ID</div>
              </div>
              <div className="table-body">
                {data.map((item, index) => (
                  <div className="table-row" key={index}>
                    <div className="table-cell">{item.rank}</div>
                    <div className="table-cell">{item.accountId}</div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

