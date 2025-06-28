import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

export const useSelfCheckoutLogic = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const totalItems = cart.reduce((sum: number, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum: number, item) => sum + item.quantity * item.product.price, 0);

  const handlePay = async () => {
    const products = cart.map(item => ({
      barcode: item.product.barcode,
      quantity: item.quantity
    }));

    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        products,
        cardAmountReceived: totalPrice,
        cashAmountReceived: 0,
        paymentMethod: 'Card'
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.receiptUrl) {
        window.open(data.receiptUrl, '_blank');
      }
      clearCart();
      navigate('/thanks');
    } else {
      alert('Eroare la procesarea plății.');
    }
  };

  return { totalItems, totalPrice, handlePay };
};
