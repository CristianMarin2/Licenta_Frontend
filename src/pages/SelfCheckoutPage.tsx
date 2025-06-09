import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PosLayout from '../components/layout/PosLayout';
import { useCart } from '../contexts/CartContext';
import { useSelfCheckout } from '../contexts/SelfCheckoutContext';
import CashierLoginModal from '../components/shared/CashierLoginModal';
import SelfCheckoutPanel from '../components/forms/SelfCheckoutPanel';

const SelfCheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const [isFinished, setIsFinished] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [showCashierModal, setShowCashierModal] = useState(false);

  const { isCashierOverride, setCashierOverride } = useSelfCheckout();
  const navigate = useNavigate();

  const totalToPay = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCardPayment = async () => {
    if (isFinished || isLocked || cart.length === 0) return;

    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user?.employeeCode) {
      alert('Casierul nu este autentificat.');
      return;
    }

    try {
      const sessionResp = await api.get('/salesession/active');
      const session = sessionResp.data.find((s: any) => s.cashierCode === user.employeeCode);
      if (!session) {
        alert('Sesiune inexistentă.');
        return;
      }

      const items = cart.map(item => ({
        productBarcode: item.product.barcode,
        quantity: item.quantity,
        unitPrice: item.product.price
      }));

      const result = await api.post('/saletransaction', {
        saleSessionId: session.id,
        totalAmount: totalToPay,
        paymentMethod: 'Card',
        cashAmountReceived: 0,
        cardAmountReceived: totalToPay,
        changeGiven: null,
        items,
        status: 'Succeeded'
      });

      const receiptUrl = result.data?.receiptUrl;
      if (receiptUrl) {
        window.open(`http://localhost:5032${receiptUrl}`, '_blank');
      }

      setIsFinished(true);
      setIsLocked(true);
      setTimeout(() => {
        clearCart();
        navigate('/self/scan');
      }, 3000);
    } catch (err) {
      console.error(err);
      alert('Eroare la trimiterea tranzacției.');
    }
  };

  return (
    <>
      <PosLayout
        topLeft={
          <SelfCheckoutPanel
            cart={cart}
            total={totalToPay}
            isFinished={isFinished}
          />
        }
        bottomLeft={
          <div></div>
        }
        right={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {!isFinished && (
              <button onClick={handleCardPayment} disabled={isLocked}>
                Plătește cu cardul
              </button>
            )}
            {isCashierOverride ? (
              <>
                <button onClick={() => navigate('/self/scan')}>Înapoi</button>
                <button
                  onClick={() => {
                    clearCart();
                    navigate('/self/scan');
                  }}
                >
                  Anulează bon
                </button>
                <button onClick={() => setCashierOverride(false)}>Revino la client</button>
              </>
            ) : (
              <button onClick={() => setShowCashierModal(true)}>Cheamă casier</button>
            )}
          </div>
        }
      />

      {showCashierModal && (
        <CashierLoginModal
          onClose={() => setShowCashierModal(false)}
          onSuccess={() => {
            setCashierOverride(true);
            setShowCashierModal(false);
          }}
        />
      )}
    </>
  );
};

export default SelfCheckoutPage;
