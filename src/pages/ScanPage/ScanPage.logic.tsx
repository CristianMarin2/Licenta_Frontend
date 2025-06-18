import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useCart } from '../../contexts/CartContext';

const useScanPageLogic = () => {
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedBarcode, setSelectedBarcode] = useState<string | null>(null);
  const [canceledLines, setCanceledLines] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);
  const [showSupervisorModal, setShowSupervisorModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const { cart, addProduct, updateQuantity, removeProduct } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

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

  return {
    barcode,
    quantity,
    selectedBarcode,
    sessionActive,
    showSupervisorModal,
    showImportModal,
    cart,
    total,
    handleKeyClick,
    handleSetQuantity,
    handleRemoveLine,
    confirmRemoveLine,
    setShowImportModal,
    setShowSupervisorModal,
    setSelectedBarcode,
    navigate,
  };
};

export default useScanPageLogic;
