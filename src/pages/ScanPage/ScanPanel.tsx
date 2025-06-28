import React from 'react';
import { CartItem } from '../../contexts/CartContext';
import './ScanPage.css';

interface ScanPanelProps {
  cart: CartItem[];
  barcode: string;
  quantity: number;
  selectedBarcode: string | null;
  total: number;
  onSelectProduct: (barcode: string) => void;
}

const ScanPanel: React.FC<ScanPanelProps> = ({
  cart,
  barcode,
  quantity,
  selectedBarcode,
  total,
  onSelectProduct
}) => {
  return (
    <div className="scan-panel">
      <div className="scan-list">
        <h3>Bon fiscal</h3>
        <ul>
          {cart.map((item, idx) => (
            <li
              key={idx}
              className={selectedBarcode === item.product.barcode ? 'selected' : ''}
              onClick={() => onSelectProduct(item.product.barcode)}
            >
              {item.product.name} × {item.quantity}
              <span>{(item.product.price * item.quantity).toFixed(2)} lei</span>
            </li>
          ))}
        </ul>
        <div className="scan-total">Total: {total.toFixed(2)} lei</div>
      </div>

      <div className="scan-barcode-bar">
        <input type="text" value={barcode} readOnly placeholder="Cod de bare" />
        <div className="qty-display">x{quantity}</div>
      </div>
    </div>
  );
};

export default ScanPanel;
