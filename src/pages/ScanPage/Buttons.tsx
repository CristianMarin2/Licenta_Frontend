import React from 'react';
import './ScanPage.css';

interface ButtonsProps {
  cartLength: number;
  sessionActive: boolean;
  selectedBarcode: string | null;
  onSetQuantity: () => void;
  onRemoveLine: () => void;
  onCheckout: () => void;
  onImportQR: () => void;
  onSessionToggle: () => void;
  onLogout: () => void;
}

const Buttons: React.FC<ButtonsProps> = ({
  cartLength,
  sessionActive,
  selectedBarcode,
  onSetQuantity,
  onRemoveLine,
  onCheckout,
  onImportQR,
  onSessionToggle,
  onLogout
}) => {
  return (
    <div className="buttons">
  <button
    onClick={onSetQuantity}
    className={!selectedBarcode ? 'invisible' : ''}
  >
    Cantitate nouă
  </button>

  <button
    onClick={onRemoveLine}
    className={!selectedBarcode ? 'invisible' : ''}
  >
    Anulează linia
  </button>

  <button
    onClick={onCheckout}
    className={cartLength === 0 ? 'invisible' : ''}
  >
    Total
  </button>

  <button onClick={onImportQR}>Importă coș din QR</button>

  <button
    onClick={onSessionToggle}
    className={cartLength > 0 ? 'invisible' : ''}
  >
    {sessionActive ? 'Depunere' : 'Alimentare'}
  </button>

  <button
    onClick={onLogout}
    className={cartLength > 0 ? 'invisible' : ''}
  >
    Logout
  </button>
</div>

  );
};

export default Buttons;
