import React from 'react';
import './LoginPage.css';

const Buttons: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="corner-buttons">
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default Buttons;