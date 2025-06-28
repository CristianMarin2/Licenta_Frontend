import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useCart } from '../../contexts/CartContext';
import { useSelfCheckout } from '../../contexts/SelfCheckoutContext';

const useSelfScanLogic = () => {
  const [barcode, setBarcode] = useState('');
  const [canceledLines, setCanceledLines] = useState(0);
  const [selectedBarcode, setSelectedBarcode] = useState<string | null>(null);
  const [showCashierLogin, setShowCashierLogin] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [loginInputs, setLoginInputs] = useState({ employeeCode: '', password: '' });
  const [activeField, setActiveField] = useState<'supervisorCode' | 'supervisorPass'>('supervisorCode');

  const { cart, addProduct, removeProduct } = useCart();
  const { isCashierOverride, setCashierOverride } = useSelfCheckout();
  const navigate = useNavigate();

  const handleKeyClick = (key: string) => {
    const updateField = (field: 'employeeCode' | 'password', value: string) => {
      setLoginInputs(prev => ({ ...prev, [field]: value }));
    };

    if (showCashierLogin) {
      if (key === '<-') {
        const field = activeField === 'supervisorCode' ? 'employeeCode' : 'password';
        updateField(field, loginInputs[field].slice(0, -1));
      } else if (key === 'C') {
        setLoginInputs({ employeeCode: '', password: '' });
      } else {
        const field = activeField === 'supervisorCode' ? 'employeeCode' : 'password';
        updateField(field, loginInputs[field] + key);
      }
      return;
    }

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

  const handleReturnToClient = () => {
    setCashierOverride(false);
  };

  const handleLoginInputChange = (value: { employeeCode: string; password: string }) => {
    setLoginInputs(value);
  };

  const handleFieldFocus = (field: 'supervisorCode' | 'supervisorPass') => {
    setActiveField(field);
  };

 const handleCashierLogin = async () => {
  try {
    const response = await api.post('/users/login', loginInputs);
    const user = response.data;

    if (user.role !== 'Cashier' && user.role !== 'Supervisor') {
      alert('Doar casierii sau supervizorii pot interveni aici.');
      return;
    }

    setCashierOverride(true);
    setShowCashierLogin(false);
    setLoginInputs({ employeeCode: '', password: '' });
  } catch {
    alert('Date invalide. Încearcă din nou.');
  }
};

  return {
    barcode,
    cart,
    selectedBarcode,
    isCashierOverride,
    showCashierLogin,
    showImportModal,
    loginInputs,
    activeField,
    handleKeyClick,
    setShowImportModal,
    setShowCashierLogin,
    onSelectProduct: setSelectedBarcode,
    handleTotalClick,
    handleRemoveLine,
    handleLogout,
    handleLoginInputChange,
    handleFieldFocus,
    handleCashierLogin,
    handleReturnToClient,
  };
};

export default useSelfScanLogic;
