import PosLayout from '../../components/layout/PosLayout';
import Numpad from '../../components/shared/Numpad';
import CheckoutPanel from './CheckoutPanel';
import SupervisorLoginPanel from '../../components/shared/SupervisorLoginPanel';
import Buttons from './Buttons';
import useCheckoutPageLogic from './CheckoutPage.logic';

const CheckoutPage = () => {
  const {
    cart,
    paymentInput,
    remaining,
    change,
    showSupervisorModal,
    inputTarget,
    supervisorInputs,
    handleKeyClick,
    handleAddPayment,
    handleCancelTransaction,
    setShowSupervisorModal,
    navigate,
    setInputTarget,
    setSupervisorInputs,
    handleSupervisorLogin
  } = useCheckoutPageLogic();

  return (
    <PosLayout
      topLeft={
        <CheckoutPanel
          cart={cart}
          remaining={remaining}
          change={change}
          paymentInput={paymentInput}
          onKeyClick={handleKeyClick}
          onAddCash={() => handleAddPayment('Cash')}
          onAddCard={() => handleAddPayment('Card')}
        />
      }
      bottomLeft={
        <div>
          <Numpad onKeyClick={handleKeyClick} />
          {!showSupervisorModal && (
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button style={{ flex: 1 }} onClick={() => handleAddPayment('Cash')}>Cash</button>
              <button style={{ flex: 1 }} onClick={() => handleAddPayment('Card')}>Card</button>
            </div>
          )}
        </div>
      }
      right={
        showSupervisorModal ? (
          <SupervisorLoginPanel
            inputs={supervisorInputs}
            onChangeField={setSupervisorInputs}
            onFocusField={setInputTarget}
            onSubmit={handleSupervisorLogin}
            onCancel={() => setShowSupervisorModal(false)}
          />
        ) : (
          <Buttons
            onBack={() => navigate('/scan')}
            onCancel={() => {
              setShowSupervisorModal(true);
              setInputTarget('supervisorCode');
            }}
          />
        )
      }
    />
  );
};

export default CheckoutPage;
