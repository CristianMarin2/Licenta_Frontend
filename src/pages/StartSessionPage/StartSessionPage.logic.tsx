import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useSession } from '../../contexts/SessionContext';

const useStartSessionPageLogic = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { user } = useAuth();
  const { refreshSession } = useSession();

  const handleKeyClick = (key: string) => {
    if (key === '<-') setAmount(prev => prev.slice(0, -1));
    else if (key === 'C') setAmount('');
    else setAmount(prev => prev + key);
  };

  const handleSubmit = async () => {
    if (!user?.employeeCode) {
      setMessage('Utilizatorul nu este autentificat.');
      return;
    }

    try {
      const response = await api.post('/salesession/start', {
        cashierCode: user.employeeCode,
        initialCashAmount: parseFloat(amount)
      });

      if (response?.data?.id) {
        await refreshSession(user.employeeCode);
        setTimeout(() => navigate('/scan'), 1000);
      } else {
        setMessage('Sesiunea a fost pornită, dar fără ID în răspuns.');
      }
    } catch (err) {
      setMessage('Eroare la pornirea sesiunii.');
      console.error(err);
    }
  };

  return {
    amount,
    message,
    handleKeyClick,
    handleSubmit,
    navigate
  };
};

export default useStartSessionPageLogic;
