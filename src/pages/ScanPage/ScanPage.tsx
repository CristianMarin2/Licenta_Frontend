import PosLayout from '../../components/layout/PosLayout';
import Numpad from '../../components/shared/Numpad';
import ImportQrModal from '../../components/Modals/ImportQRModal';
import ScanPanel from './ScanPanel';
import SupervisorLoginPanel from '../../components/shared/SupervisorLoginPanel';
import Buttons from './Buttons';
import useScanPageLogic from './ScanPage.logic';

const ScanPage = () => {
  const {
    barcode,
    quantity,
    selectedBarcode,
    sessionActive,
    showImportModal,
    showSupervisorLogin,
    supervisorInputs,
    focusedField,
    cart,
    total,
    handleKeyClick,
    handleSetQuantity,
    handleRemoveLine,
    confirmRemoveLine,
    handleSupervisorLoginSubmit,
    setFocusedField,
    setSupervisorInputs,
    setShowImportModal,
    setShowSupervisorLogin,
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
          showSupervisorLogin ? (
            <SupervisorLoginPanel
              inputs={supervisorInputs}
              onChangeField={setSupervisorInputs}
              onFocusField={setFocusedField}
              onSubmit={handleSupervisorLoginSubmit}
              onCancel={() => setShowSupervisorLogin(false)}
            />
          ) : (
            <Buttons
              cartLength={cart.length}
              sessionActive={sessionActive}
              selectedBarcode={selectedBarcode}
              onSetQuantity={handleSetQuantity}
              onRemoveLine={handleRemoveLine}
              onCheckout={() => {
                if (cart.length === 0) {
                  alert('Coșul este gol.');
                  return;
                }
                navigate('/checkout');
              }}
              onImportQR={() => setShowImportModal(true)}
              onSessionToggle={() => {
                if (cart.length > 0) {
                  alert('Nu poți face depunere cât timp există produse în coș.');
                  return;
                }
                navigate(sessionActive ? '/end-session' : '/start-session');
              }}
              onLogout={() => {
                if (cart.length > 0) {
                  alert('Nu poți ieși cât timp există produse în coș.');
                  return;
                }
                localStorage.removeItem('user');
                window.location.reload();
              }}
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

export default ScanPage;
