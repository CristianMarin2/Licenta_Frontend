import React from 'react';
import { CartItem } from '../../contexts/CartContext';
import '../../styles/ScanPanel.css';

interface SelfScanPanelProps {
  cart: CartItem[];
  barcode: string;
  selectedBarcode: string | null;
  onSelectProduct: (barcode: string) => void;
}

const SelfScanPanel: React.FC<SelfScanPanelProps> = ({
  cart,
  barcode,
  selectedBarcode,
  onSelectProduct
}) => {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

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
    </div>
  );
};

export default SelfScanPanel;
