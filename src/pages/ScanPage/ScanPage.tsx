import PosLayout from '../../components/layout/PosLayout';
import Numpad from '../../components/shared/Numpad';
import ImportQrModal from '../../components/Modals/ImportQRModal';
import SupervisorLoginModal from '../../components/Modals/SupervisorLoginModal';
import ScanPanel from './ScanPanel';
import useScanPageLogic from './ScanPage.logic';

const ScanPage = () => {
  const {
    barcode,
    quantity,
    selectedBarcode,
    sessionActive,
    showImportModal,
    showSupervisorModal,
    cart,
    total,
    handleKeyClick,
    handleSetQuantity,
    handleRemoveLine,
    setShowImportModal,
    setShowSupervisorModal,
    confirmRemoveLine,
    setSelectedBarcode,
    navigate,
  } = useScanPageLogic();

  return (
    <>
      <PosLayout
        topLeft={
          <ScanPanel
            cart={cart}
            barcode={barcode}
            quantity={quantity}
            selectedBarcode={selectedBarcode}
            total={total}
            onSelectProduct={setSelectedBarcode}
          />
        }
        bottomLeft={<Numpad onKeyClick={handleKeyClick} />}
        right={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button onClick={handleSetQuantity} disabled={!selectedBarcode}>Cantitate nouă</button>
            <button onClick={handleRemoveLine} disabled={!selectedBarcode}>Anulează linia</button>
            <button onClick={() => {
              if (cart.length === 0) {
                alert('Coșul este gol.');
                return;
              }
              navigate('/checkout');
            }}>Total</button>
            <button onClick={() => setShowImportModal(true)}>📷 Importă coș din QR</button>
            <button onClick={() => {
              if (cart.length > 0) {
                alert('Nu poți face depunere cât timp există produse în coș.');
                return;
              }
              if (sessionActive) {
                navigate('/end-session');
              } else {
                navigate('/start-session');
              }
            }}>
              {sessionActive ? 'Depunere' : 'Alimentare'}
            </button>
            <button onClick={() => {
              if (cart.length > 0) {
                alert('Nu poți ieși cât timp există produse în coș.');
                return;
              }
              localStorage.removeItem('user');
              window.location.reload();
            }}>Logout</button>
          </div>
        }
      />

      {showSupervisorModal && (
        <SupervisorLoginModal
          onClose={() => setShowSupervisorModal(false)}
          onSuccess={confirmRemoveLine}
        />
      )}

      {showImportModal && (
        <ImportQrModal onClose={() => setShowImportModal(false)} />
      )}
    </>
  );
};

export default ScanPage;
