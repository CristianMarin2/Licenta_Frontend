import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useCart } from '../../contexts/CartContext';

type Payment = {
  method: 'Cash' | 'Card';
  amount: number;
};

const useCheckoutPageLogic = () => {
  const { cart, clearCart } = useCart();
  const [paymentInput, setPaymentInput] = useState('');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [showSupervisorModal, setShowSupervisorModal] = useState(false);
  const [inputTarget, setInputTarget] = useState<'payment' | 'supervisorCode' | 'supervisorPass'>('payment');
  const [supervisorInputs, setSupervisorInputs] = useState({ employeeCode: '', password: '' });

  const navigate = useNavigate();

  const totalToPay = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = totalToPay - totalPaid;
  const change = totalPaid > totalToPay ? totalPaid - totalToPay : 0;

  useEffect(() => {
    if (totalPaid >= totalToPay && !isFinished && payments.length > 0) {
      finalizeTransaction();
    }
  }, [totalPaid]);

  const handleKeyClick = (key: string) => {
    if (isLocked) return;

    if (inputTarget === 'payment') {
      setPaymentInput(prev => key === '<-' ? prev.slice(0, -1) : prev + key);
    } else {
      setSupervisorInputs(prev => {
        const field = inputTarget === 'supervisorCode' ? 'employeeCode' : 'password';
        const currentValue = prev[field];
        return {
          ...prev,
          [field]: key === '<-' ? currentValue.slice(0, -1) : currentValue + key
        };
      });
    }
  };

  const handleAddPayment = (method: 'Cash' | 'Card') => {
    if (isFinished || isLocked) return;

    const hasInput = paymentInput.trim() !== '';
    const amount = hasInput ? parseFloat(paymentInput) : (method === 'Card' ? remaining : NaN);

    if (isNaN(amount) || amount <= 0) {
      alert('Suma introdusă nu este validă.');
      return;
    }

    if (amount > remaining) {
      alert(`Suma introdusă depășește totalul de plată (${remaining.toFixed(2)} lei).`);
      return;
    }

    setPayments(prev => [...prev, { method, amount }]);
    setPaymentInput('');
  };

  const finalizeTransaction = async () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user?.employeeCode) {
      alert('Utilizatorul nu este autentificat.');
      return;
    }

    try {
      const response = await api.get('/salesession/active');
      const session = response.data.find((s: any) => s.cashierCode === user.employeeCode);
      if (!session) {
        alert('Nu există sesiune activă.');
        return;
      }

      const items = cart.map(item => ({
        productBarcode: item.product.barcode,
        quantity: item.quantity,
        unitPrice: item.product.price
      }));

      const cashPaid = payments.filter(p => p.method === 'Cash').reduce((sum, p) => sum + p.amount, 0);
      const cardPaid = payments.filter(p => p.method === 'Card').reduce((sum, p) => sum + p.amount, 0);

      const result = await api.post('/saletransaction', {
        saleSessionId: session.id,
        totalAmount: totalToPay,
        paymentMethod: cardPaid === 0 ? 'Cash' : cashPaid === 0 ? 'Card' : 'Mixed',
        cashAmountReceived: cashPaid || 0,
        cardAmountReceived: cardPaid || 0,
        changeGiven: change > 0 ? change : null,
        items,
        status: 'Succeeded'
      });

      const receiptUrl = result.data?.receiptUrl;
      if (receiptUrl) {
        window.open(`http://localhost:5000${receiptUrl}`, '_blank');
      }

      setIsFinished(true);
      setIsLocked(true);

      setTimeout(() => {
        clearCart();
        navigate('/scan');
      }, 5000);
    } catch (error) {
      console.error(error);
      alert('Eroare la trimiterea tranzacției.');
    }
  };

  const handleCancelTransaction = async () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user?.employeeCode) {
      alert('Utilizatorul nu este autentificat.');
      return;
    }

    try {
      const response = await api.get('/salesession/active');
      const session = response.data.find((s: any) => s.cashierCode === user.employeeCode);
      if (!session) {
        alert('Nu există sesiune activă.');
        return;
      }

      const items = cart.map(item => ({
        productBarcode: item.product.barcode,
        quantity: item.quantity,
        unitPrice: item.product.price
      }));

      await api.post('/saletransaction', {
        saleSessionId: session.id,
        totalAmount: 0,
        paymentMethod: 'Canceled',
        cashAmountReceived: 0,
        cardAmountReceived: 0,
        changeGiven: 0,
        items,
        status: 'Canceled'
      });

      setIsFinished(true);
      setIsLocked(true);

      setTimeout(() => {
        clearCart();
        navigate('/scan');
      }, 3000);
    } catch (error) {
      console.error(error);
      alert('Eroare la anularea bonului.');
    }
  };

  const handleSupervisorLogin = async () => {
    try {
      const response = await api.post('/users/login', supervisorInputs);
      const data = response.data;
      if (data.role !== 'Supervisor' && data.role !== 'Admin') {
        alert('Acces permis doar supervizorilor.');
        return;
      }
      await handleCancelTransaction();
      setShowSupervisorModal(false);
    } catch (err) {
      alert('Login invalid sau eroare de rețea.');
    }
  };

  return {
    cart,
    paymentInput,
    remaining,
    change,
    showSupervisorModal,
    inputTarget,
    supervisorInputs,
    handleKeyClick,
    handleAddPayment,
    handleCancelTransaction,
    handleSupervisorLogin,
    setShowSupervisorModal,
    navigate,
    setInputTarget,
    setSupervisorInputs
  };
};

export default useCheckoutPageLogic;
