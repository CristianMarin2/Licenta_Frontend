import React from 'react';

interface StartSessionPanelProps {
  amount: string;
  message: string;
  onSubmit: () => void;
}

const StartSessionPanel: React.FC<StartSessionPanelProps> = ({
  amount,
  message,
  onSubmit
}) => {
  return (
    <div>
      <h3>Start sesiune casier</h3>
      <p style={{ fontSize: '1.3rem', marginBottom: '1rem', textAlign: 'center' }}>
        Suma introdusă: <strong>{amount || '—'} lei</strong>
      </p>
      {message && (
        <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
          {message}
        </div>
      )}
      
        
      
    </div>
  );
};

export default StartSessionPanel;
