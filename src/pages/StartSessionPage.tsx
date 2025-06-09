import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PosLayout from '../components/layout/PosLayout';
import Numpad from '../components/shared/Numpad';
import { useAuth } from '../contexts/AuthContext';
import { useSession } from '../contexts/SessionContext';
import StartSessionPanel from '../components/forms/StartSessionPanel';

const StartSessionPage = () => {
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

  return (
    <PosLayout
      topLeft={
        <StartSessionPanel
          amount={amount}
          message={message}
          onSubmit={handleSubmit}
        />
      }
      bottomLeft={
        <div>
          <input
            type="text"
            value={amount}
            readOnly
            placeholder="Suma inițială (lei)"
            style={{
              fontSize: '1.5rem',
              textAlign: 'center',
              width: '100%',
              marginBottom: '1rem',
              padding: '0.75rem'
            }}
          />
          <Numpad onKeyClick={handleKeyClick} />
        </div>
      }
      right={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button onClick={handleSubmit}>Pornește sesiunea</button>
          <button onClick={() => navigate('/scan')}>Înapoi</button>
        </div>
      }
    />
  );
};

export default StartSessionPage;
