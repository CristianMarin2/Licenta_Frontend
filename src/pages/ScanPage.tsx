import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PosLayout from '../components/layout/PosLayout';
import Numpad from '../components/shared/Numpad';
import SupervisorLoginModal from '../components/shared/SupervisorLoginModal';
import { useCart } from '../contexts/CartContext';
import ScanPanel from '../components/forms/ScanPanel';
import ImportQrModal from '../components/shared/ImportQRModal';

const ScanPage = () => {
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sessionActive, setSessionActive] = useState(false);
  const [selectedBarcode, setSelectedBarcode] = useState<string | null>(null);
  const [canceledLines, setCanceledLines] = useState(0);
  const [showSupervisorModal, setShowSupervisorModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const { cart, addProduct, updateQuantity, removeProduct } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (!user?.employeeCode) return;

      const response = await api.get('/salesession/active');
      const session = response.data.find((s: any) => s.cashierCode === user.employeeCode);
      setSessionActive(!!session);
    } catch (error) {
      console.error('Eroare la verificarea sesiunii:', error);
    }
  };

  const handleScan = async () => {
    if (!barcode.trim()) {
      alert('Introduceți un cod de bare.');
      return;
    }

    try {
      const response = await api.get(`/products?barcode=${barcode}`);
      const product = response.data;

      if (!product || !product.barcode) {
        alert('Produsul nu a fost găsit.');
        return;
      }

      addProduct(product, quantity);
      setBarcode('');
      setQuantity(1);
    } catch (error) {
      alert('Produsul nu a fost găsit.');
      console.error(error);
    }
  };

  const handleKeyClick = (key: string) => {
    if (key === '<-') {
      setBarcode(prev => prev.slice(0, -1));
    } else if (key === 'C') {
      setBarcode('');
      setQuantity(1);
    } else if (key === 'x') {
      const parsedQty = parseInt(barcode, 10);
      if (!isNaN(parsedQty)) {
        setQuantity(parsedQty);
        setBarcode('');
      }
    } else if (key === 'ENTER') {
      handleScan();
    } else {
      setBarcode(prev => prev + key);
    }
  };

  const confirmRemoveLine = () => {
    if (!selectedBarcode) return;
    removeProduct(selectedBarcode);
    setCanceledLines(prev => prev + 1);
    setSelectedBarcode(null);
  };

  const handleRemoveLine = () => {
    if (!selectedBarcode) return;

    if (cart.length === 1) {
      alert('Nu poți anula ultima linie din bon.');
      return;
    }

    if (canceledLines >= 2) {
      setShowSupervisorModal(true);
      return;
    }

    confirmRemoveLine();
  };

  const handleSetQuantity = () => {
    if (!selectedBarcode) return;
    const item = cart.find(p => p.product.barcode === selectedBarcode);
    if (!item) return;

    const input = prompt(`Produs: ${item.product.name}\nCantitate actuală: ${item.quantity}\nNoua cantitate:`);
    const newQty = parseInt(input || '', 10);
    if (!isNaN(newQty) && newQty > 0) {
      updateQuantity(selectedBarcode, newQty);
      setSelectedBarcode(null);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

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
              setCanceledLines(0);
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
