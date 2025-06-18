import PosLayout from '../../components/layout/PosLayout';
import Numpad from '../../components/shared/Numpad';
import SupervisorLoginModal from '../../components/Modals/SupervisorLoginModal';
import CheckoutPanel from './CheckoutPanel';
import useCheckoutPageLogic from './CheckoutPage.logic';

const CheckoutPage = () => {
  const {
    cart,
    paymentInput,
    remaining,
    change,
    isLocked,
    showSupervisorModal,
    handleKeyClick,
    handleAddPayment,
    handleCancelTransaction,
    setShowSupervisorModal,
    navigate
  } = useCheckoutPageLogic();

  return (
    <>
      <PosLayout
        topLeft={
          <CheckoutPanel
            cart={cart}
            remaining={remaining}
            change={change}
            paymentInput={paymentInput}
            isLocked={isLocked}
            onKeyClick={handleKeyClick}
            onAddCash={() => handleAddPayment('Cash')}
            onAddCard={() => handleAddPayment('Card')}
          />
        }

        bottomLeft={
          <div>
            {!isLocked && <Numpad onKeyClick={handleKeyClick} />}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button style={{ flex: 1 }} onClick={() => handleAddPayment('Cash')} disabled={isLocked}>Cash</button>
              <button style={{ flex: 1 }} onClick={() => handleAddPayment('Card')} disabled={isLocked}>Card</button>
            </div>
          </div>
        }

        right={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button onClick={() => navigate('/scan')} disabled={isLocked}>Înapoi</button>
            <button onClick={() => setShowSupervisorModal(true)} disabled={isLocked}>Anulează bon</button>
          </div>
        }
      />

      {showSupervisorModal && (
        <SupervisorLoginModal
          onClose={() => setShowSupervisorModal(false)}
          onSuccess={handleCancelTransaction}
        />
      )}
    </>
  );
};

export default CheckoutPage;
