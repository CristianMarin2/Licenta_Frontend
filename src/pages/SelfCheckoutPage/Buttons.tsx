import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  handlePay: () => void;
}

export const Buttons: React.FC<Props> = ({ handlePay }) => {
  const navigate = useNavigate();

  return (
    <div className="button-panel">
      <button className="btn btn-outline-secondary" onClick={() => navigate('/self/scan')}>
        Revizuiește coșul
      </button>
      <button className="btn btn-primary" onClick={handlePay}>
        Plătește cu cardul
      </button>
    </div>
  );
};
