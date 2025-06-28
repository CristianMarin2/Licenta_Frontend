import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useSession } from '../../contexts/SessionContext';
import { useAuth } from '../../contexts/AuthContext';

const useEndSessionPageLogic = () => {
  const [declaredAmount, setDeclaredAmount] = useState('');
  const navigate = useNavigate();

  const { session, clearSession, refreshSession } = useSession();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user?.employeeCode) {
      refreshSession(user.employeeCode);
    }
  }, []);

  const handleKeyClick = (key: string) => {
    if (key === '<-') {
      setDeclaredAmount(prev => prev.slice(0, -1));
    } else {
      setDeclaredAmount(prev => prev + key);
    }
  };

  const handleSubmit = async () => {
    if (!session) {
      alert('Nu există sesiune de închis.');
      return;
    }

    try {
      await api.post(`/salesession/end/${session.id}`, {
        DeclaredFinalCashAmount: parseFloat(declaredAmount),
      });

      clearSession();
      logout();
    } catch (error) {
      console.error(error);
      alert('Eroare la închiderea sesiunii.');
    }
  };

  return {
    session,
    declaredAmount,
    handleKeyClick,
    handleSubmit,
    navigate,
  };
};

export default useEndSessionPageLogic;
