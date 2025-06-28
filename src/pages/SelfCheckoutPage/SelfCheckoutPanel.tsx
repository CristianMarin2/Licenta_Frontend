import React from 'react';

interface Props {
  totalItems: number;
  totalPrice: number;
}

export const SelfCheckoutPanel: React.FC<Props> = ({ totalItems, totalPrice }) => {
  return (
    <div className="checkout-panel">
      <h2>Rezumat Coș</h2>
      <p>Produse: <strong>{totalItems}</strong></p>
      <p>Total de plată: <strong>{totalPrice.toFixed(2)} lei</strong></p>
    </div>
  );
};
