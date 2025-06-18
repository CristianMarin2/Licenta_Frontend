import PosLayout from '../../components/layout/PosLayout';
import Numpad from '../../components/shared/Numpad';
import CashierLoginModal from '../../components/Modals/CashierLoginModal';
import ImportQrModal from '../../components/Modals/ImportQRModal';
import SelfScanPanel from './SelfScanPanel';
import useSelfScanLogic from './SelfScanPage.logic';

const SelfScanPage = () => {
  const {
    cart,
    barcode,
    selectedBarcode,
    isCashierOverride,
    showCashierModal,
    showImportModal,
    handleKeyClick,
    setShowImportModal,
    setShowCashierModal,
    onSelectProduct,
    handleTotalClick,
    handleRemoveLine,
    handleLogout,
    handleCashierLoginSuccess,
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button onClick={handleTotalClick}>Total</button>
            <button onClick={() => setShowImportModal(true)}>📷 Importă coș din QR</button>

            {isCashierOverride ? (
              <>
                <button onClick={handleRemoveLine} disabled={!selectedBarcode}>Anulează produs</button>
                <button onClick={() => setShowCashierModal(false)}>Revino la client</button>
                <button
                  style={{ backgroundColor: '#dc3545', color: 'white' }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
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
          onSuccess={handleCashierLoginSuccess}
        />
      )}

      {showImportModal && (
        <ImportQrModal onClose={() => setShowImportModal(false)} />
      )}
    </>
  );
};

export default SelfScanPage;
