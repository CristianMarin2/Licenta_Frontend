import React from 'react';
import './PosLayout.css';

interface PosLayoutProps {
  topLeft: React.ReactNode;
  bottomLeft: React.ReactNode;
  right: React.ReactNode;
}

const PosLayout: React.FC<PosLayoutProps> = ({ topLeft, bottomLeft, right }) => {
  return (
    <div className="pos-layout">
      <div className="pos-left">
        <div className="pos-top-left pos-card">{topLeft}</div>
        <div className="pos-bottom-left pos-card">{bottomLeft}</div>
      </div>
      <div className="pos-right pos-card">{right}</div>
    </div>
  );
};

export default PosLayout;
