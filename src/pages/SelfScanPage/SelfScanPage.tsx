import PosLayout from '../../components/layout/PosLayout';
import Numpad from '../../components/shared/Numpad';
import ImportQrModal from '../../components/Modals/ImportQRModal';
import SupervisorLoginPanel from '../../components/shared/SupervisorLoginPanel';
import SelfScanPanel from './SelfScanPanel';
import Buttons from './Buttons';
import useSelfScanLogic from './SelfScanPage.logic';
import './SelfScanPage.css';

const SelfScanPage = () => {
  const {
    cart,
    barcode,
    selectedBarcode,
    isCashierOverride,
    showCashierLogin,
    showImportModal,
    loginInputs,
    activeField,
    handleKeyClick,
    setShowImportModal,
    setShowCashierLogin,
    onSelectProduct,
    handleTotalClick,
    handleRemoveLine,
    handleLogout,
    handleLoginInputChange,
    handleFieldFocus,
    handleCashierLogin,
    handleReturnToClient,
  } = useSelfScanLogic();

  return (
    <>
      <PosLayout
        topLeft={
          <SelfScanPanel
            cart={cart}
            barcode={barcode}
            selectedBarcode={selectedBarcode}
            onSelectProduct={onSelectProduct}
          />
        }

        bottomLeft={
          <div>
            <input
              type="text"
              value={barcode}
              readOnly
              placeholder="Cod de bare"
              style={{
                fontSize: '1.5rem',
                textAlign: 'center',
                width: '100%',
                marginBottom: '1rem',
              }}
            />
            <Numpad onKeyClick={handleKeyClick} />
          </div>
        }

        right={
          showCashierLogin ? (
            <SupervisorLoginPanel
              inputs={loginInputs}
              onChangeField={handleLoginInputChange}
              onFocusField={handleFieldFocus}
              onSubmit={handleCashierLogin}
              onCancel={() => setShowCashierLogin(false)}
            />
          ) : (
            <Buttons
              cartLength={cart.length}
              isCashierOverride={isCashierOverride}
              selectedBarcode={selectedBarcode}
              onCheckout={handleTotalClick}
              onImportQR={() => setShowImportModal(true)}
              onRemoveLine={handleRemoveLine}
              onCashierLogin={() => setShowCashierLogin(true)}
              onCashierLogout={handleLogout}
              onReturnToClient={handleReturnToClient}
            />
          )
        }
      />

      {showImportModal && (
        <ImportQrModal onClose={() => setShowImportModal(false)} />
      )}
    </>
  );
};

export default SelfScanPage;
