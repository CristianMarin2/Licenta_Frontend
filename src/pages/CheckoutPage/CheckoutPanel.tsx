import React from 'react';
import { CartItem } from '../../contexts/CartContext';
import './CheckoutPage.css';

interface CheckoutPanelProps {
  cart: CartItem[];
  remaining: number;
  change: number;
  paymentInput: string;
  onKeyClick: (key: string) => void;
  onAddCash: () => void;
  onAddCard: () => void;
}

const CheckoutPanel: React.FC<CheckoutPanelProps> = ({
  cart,
  remaining,
  change,
  paymentInput,
  onKeyClick,
  onAddCash,
  onAddCard
}) => {
  return (
    <div className="checkout-panel">
      <div className="checkout-list">
        <h3>Bon fiscal</h3>
        <div className="checkout-scroll">
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.product.name} × {item.quantity}
                <span>{(item.product.price * item.quantity).toFixed(2)} lei</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="checkout-total">
          De plată: {Math.max(remaining, 0).toFixed(2)} lei
          {change > 0 && (
            <>
              <br />
              Rest: {change.toFixed(2)} lei
            </>
          )}
        </div>
      </div>

      <div className="checkout-bar">
        <input
          type="text"
          value={paymentInput}
          readOnly
          placeholder="Suma introdusă"
        />
      </div>
    </div>
  );
};

export default CheckoutPanel;
