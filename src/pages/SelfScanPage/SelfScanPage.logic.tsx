import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useCart } from '../../contexts/CartContext';
import { useSelfCheckout } from '../../contexts/SelfCheckoutContext';

const useSelfScanLogic = () => {
  const [barcode, setBarcode] = useState('');
  const [canceledLines, setCanceledLines] = useState(0);
  const [selectedBarcode, setSelectedBarcode] = useState<string | null>(null);
  const [showCashierModal, setShowCashierModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const { cart, addProduct, removeProduct } = useCart();
  const { isCashierOverride, setCashierOverride } = useSelfCheckout();
  const navigate = useNavigate();

  const handleKeyClick = (key: string) => {
    if (key === '<-') {
      setBarcode(prev => prev.slice(0, -1));
    } else if (key === 'x' || key === 'c') {
      setBarcode('');
    } else if (key.toLowerCase() === 'enter') {
      handleScan();
    } else {
      setBarcode(prev => prev + key);
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

  const handleTotalClick = () => {
    if (cart.length === 0) {
      alert('Coșul este gol.');
      return;
    }

    setCanceledLines(0);
    navigate('/self/checkout');
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  const handleCashierLoginSuccess = () => {
    setCashierOverride(true);
    setShowCashierModal(false);
  };

  return {
    barcode,
    cart,
    selectedBarcode,
    isCashierOverride,
    showCashierModal,
    showImportModal,
    setShowCashierModal,
    setShowImportModal,
    onSelectProduct: setSelectedBarcode,
    handleKeyClick,
    handleTotalClick,
    handleRemoveLine,
    handleLogout,
    handleCashierLoginSuccess,
  };
};

export default useSelfScanLogic;
