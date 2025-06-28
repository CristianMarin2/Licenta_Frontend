import React from 'react';
import './CheckoutPage.css';

interface ButtonsProps {
  onBack: () => void;
  onCancel: () => void;
}

const Buttons: React.FC<ButtonsProps> = ({
  onBack,
  onCancel
}) => {
  return (
    <div className="buttons">
      <button onClick={onBack}>Înapoi</button>
      <button onClick={onCancel}>Anulează bon</button>
    </div>
  );
};

export default Buttons;
