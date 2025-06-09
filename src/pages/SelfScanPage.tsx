import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../contexts/CartContext';
import { useSelfCheckout } from '../contexts/SelfCheckoutContext';
import CashierLoginModal from '../components/shared/CashierLoginModal';
import PosLayout from '../components/layout/PosLayout';
import Numpad from '../components/shared/Numpad';
import SelfScanPanel from '../components/forms/SelfScanPanel';
import ImportQrModal from '../components/shared/ImportQRModal';

const SelfScanPage = () => {
  const [barcode, setBarcode] = useState('');
  const [canceledLines, setCanceledLines] = useState(0);
  const [selectedBarcode, setSelectedBarcode] = useState<string | null>(null);
  const [showCashierModal, setShowCashierModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const { cart, addProduct, removeProduct } = useCart();
  const { isCashierOverride, setCashierOverride } = useSelfCheckout();
  const navigate = useNavigate();

  const handleScan = async () => {
    if (!barcode.trim()) {
      alert('Introduceți un cod de bare.');
      return;
    }

    try {
      const response = await api.get(`/products?barcode=${barcode}`);
      const product = response.data;

      if (!product?.barcode) {
        alert('Produsul nu a fost găsit.');
        return;
      }

      addProduct(product, 1);
      setBarcode('');
    } catch (error) {
      alert('Produsul nu a fost găsit.');
      console.error(error);
    }
  };

  const handleKeyClick = (key: string) => {
    if (key === '<-') {
      setBarcode(prev => prev.slice(0, -1));
    } else if (key === 'x') {
      const parsedQty = parseInt(barcode, 10);
      if (!isNaN(parsedQty)) {
        setBarcode('');
      }
    } else if (key === 'c') {
      setBarcode('');
    } else if (key.toLowerCase() === 'enter') {
      handleScan();
    } else {
      setBarcode(prev => prev + key);
    }
  };

  const handleRemoveLine = () => {
    if (!selectedBarcode) return;

    if (cart.length <= 1) {
      alert('Nu poți anula ultima linie din bon.');
      return;
    }

    if (canceledLines >= 1) {
      alert('Poți anula doar un produs.');
      return;
    }

    removeProduct(selectedBarcode);
    setCanceledLines(1);
    setSelectedBarcode(null);
  };

  return (
    <>
      <PosLayout
        topLeft={
          <SelfScanPanel
            cart={cart}
            barcode={barcode}
            selectedBarcode={selectedBarcode}
            onSelectProduct={setSelectedBarcode}
          />
        }
        bottomLeft={
          <div>
            <input
              type="text"
              value={barcode}
              readOnly
              placeholder="Cod de bare"
              style={{ fontSize: '1.5rem', textAlign: 'center', width: '100%', marginBottom: '1rem' }}
            />
            <Numpad onKeyClick={handleKeyClick} />
          </div>
        }
        right={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={() => {
                if (cart.length === 0) {
                  alert('Coșul este gol.');
                  return;
                }
                setCanceledLines(0);
                navigate('/self/checkout');
              }}
            >
              Total
            </button>

            <button onClick={() => setShowImportModal(true)}>📷 Importă coș din QR</button>

            {isCashierOverride ? (
              <>
                <button onClick={handleRemoveLine} disabled={!selectedBarcode}>Anulează produs</button>
                <button onClick={() => setCashierOverride(false)}>Revino la client</button>
                <button
                  style={{ backgroundColor: '#dc3545', color: 'white' }}
                  onClick={() => {
                    localStorage.removeItem('user');
                    window.location.reload();
                  }}
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
          onSuccess={() => {
            setCashierOverride(true);
            setShowCashierModal(false);
          }}
        />
      )}

      {showImportModal && (
        <ImportQrModal onClose={() => setShowImportModal(false)} />
      )}
    </>
  );
};

export default SelfScanPage;
