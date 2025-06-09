import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PosLayout from '../components/layout/PosLayout';
import Numpad from '../components/shared/Numpad';
import { useSession } from '../contexts/SessionContext';
import { useAuth } from '../contexts/AuthContext';
import EndSessionPanel from '../components/forms/EndSessionPanel';

const EndSessionPage = () => {
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
        declaredFinalCashAmount: parseFloat(declaredAmount),
      });

      clearSession();
      logout(); // închide sesiunea și deloghează utilizatorul
    } catch (error) {
      console.error(error);
      alert('Eroare la închiderea sesiunii.');
    }
  };

  return (
    <PosLayout
      topLeft={
        <EndSessionPanel
          session={session}
          declaredAmount={declaredAmount}
          onSubmit={handleSubmit}
        />
      }

      bottomLeft={
        <div>
          <input
            type="text"
            value={declaredAmount}
            readOnly
            placeholder="Suma declarată"
            style={{
              width: '100%',
              fontSize: '1.5rem',
              textAlign: 'center',
              padding: '0.8rem',
              marginBottom: '1rem',
            }}
          />
          <Numpad onKeyClick={handleKeyClick} />
        </div>
      }

      right={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button
            onClick={() => navigate('/scan')}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              padding: '1rem',
              fontSize: '1.2rem',
              border: 'none',
              borderRadius: '6px',
            }}
          >
            Înapoi
          </button>
        </div>
      }
    />
  );
};

export default EndSessionPage;
