import PosLayout from '../../components/layout/PosLayout';
import CashierLoginModal from '../../components/Modals/CashierLoginModal';
import SelfCheckoutPanel from './SelfCheckoutPanel';
import useSelfCheckoutLogic from './SelfCheckoutPage.logic';

const SelfCheckoutPage = () => {
  const {
    cart,
    totalToPay,
    isFinished,
    isLocked,
    showCashierModal,
    isCashierOverride,
    handleCardPayment,
    handleCancel,
    handleBack,
    closeCashierOverride,
    openCashierLogin,
    handleCashierLoginSuccess
  } = useSelfCheckoutLogic();

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
        bottomLeft={<div />}
        right={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {!isFinished && (
              <button onClick={handleCardPayment} disabled={isLocked}>
                Plătește cu cardul
              </button>
            )}
            {isCashierOverride ? (
              <>
                <button onClick={handleBack}>Înapoi</button>
                <button onClick={handleCancel}>Anulează bon</button>
                <button onClick={closeCashierOverride}>Revino la client</button>
              </>
            ) : (
              <button onClick={openCashierLogin}>Cheamă casier</button>
            )}
          </div>
        }
      />

      {showCashierModal && (
        <CashierLoginModal
          onClose={closeCashierOverride}
          onSuccess={handleCashierLoginSuccess}
        />
      )}
    </>
  );
};

export default SelfCheckoutPage;
