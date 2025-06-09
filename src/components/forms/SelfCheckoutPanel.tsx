import React from 'react';
import { CartItem } from '../../contexts/CartContext';

interface Props {
  cart: CartItem[];
  total: number;
  isFinished: boolean;
}

const SelfCheckoutPanel: React.FC<Props> = ({ cart, total }) => {
  return (
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
        Total: {total.toFixed(2)} lei
      </div>
    </div>
  );
};

export default SelfCheckoutPanel;
