import React from 'react';
import './SelfScanPage.css';

interface ButtonsProps {
  cartLength: number;
  isCashierOverride: boolean;
  selectedBarcode: string | null;
  onCheckout: () => void;
  onImportQR: () => void;
  onRemoveLine: () => void;
  onCashierLogin: () => void;
  onCashierLogout: () => void;
  onReturnToClient: () => void;
}

const Buttons: React.FC<ButtonsProps> = ({
  cartLength,
  isCashierOverride,
  selectedBarcode,
  onCheckout,
  onImportQR,
  onRemoveLine,
  onCashierLogin,
  onCashierLogout,
  onReturnToClient,
}) => {
  return (
    <div className="buttons">
      {cartLength > 0 && (
        <button onClick={onCheckout}>Total</button>
      )}

      <button onClick={onImportQR}>Importă coș din QR</button>

      {!isCashierOverride && (
        <button onClick={onCashierLogin}>Cheamă un casier</button>
      )}

      {isCashierOverride && (
        <>
          <button
            onClick={onRemoveLine}
            className={!selectedBarcode ? 'invisible' : ''}
          >
            Anulează produs
          </button>

          <button onClick={onReturnToClient}>Revino la client</button>
          <button onClick={onCashierLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Buttons;
