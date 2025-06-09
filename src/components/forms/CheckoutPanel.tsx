import React from 'react';
import { CartItem } from '../../contexts/CartContext';

interface CheckoutPanelProps {
  cart: CartItem[];
  remaining: number;
  change: number;
  paymentInput: string;
  isLocked: boolean;
  onKeyClick: (key: string) => void;
  onAddCash: () => void;
  onAddCard: () => void;
}

const CheckoutPanel: React.FC<CheckoutPanelProps> = ({
  cart,
  remaining,
  change,
  paymentInput,
  isLocked,
  onKeyClick,
  onAddCash,
  onAddCard
}) => {
  return (
    <>
      <div>
        <h3>Bon fiscal</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cart.map((item, idx) => (
            <li key={idx} style={{ padding: '0.5rem 0', borderBottom: '1px dashed #ccc' }}>
              {item.product.name} × {item.quantity}
              <span style={{ float: 'right' }}>
                {(item.product.price * item.quantity).toFixed(2)} lei
              </span>
            </li>
          ))}
        </ul>
        <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '1.2rem' }}>
          De plată: {Math.max(remaining, 0).toFixed(2)} lei<br />
          {change > 0 && <>Rest: {change.toFixed(2)} lei</>}
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          value={paymentInput}
          readOnly
          disabled={isLocked}
          placeholder="Suma introdusă"
          style={{
            fontSize: '1.5rem',
            textAlign: 'center',
            width: '100%',
            marginBottom: '1rem'
          }}
        />
      </div>
    </>
  );
};

export default CheckoutPanel;
