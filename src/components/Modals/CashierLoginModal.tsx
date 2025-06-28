import { useState } from 'react';
import api from '../../services/api';
import './Modal.css';

interface CashierLoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CashierLoginModal: React.FC<CashierLoginModalProps> = ({ onClose, onSuccess }) => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await api.post('/users/login', {
        employeeCode: code,
        password: password
      });

      if (res.data?.employeeCode) {
        localStorage.setItem('user', JSON.stringify(res.data)); 
        onSuccess(); 
      } else {
        setError('Cod sau parolă incorecte.');
      }
    } catch (err) {
      console.error(err);
      setError('Autentificare eșuată.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Autentificare casier</h3>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Cod angajat"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Parolă"
        />
        {error && <div className="error">{error}</div>}
        <div style={{ marginTop: '1rem' }}>
          <button type="button" onClick={handleLogin}>Confirmă</button>
          <button type="button" onClick={onClose}>Anulează</button>
        </div>
      </div>
    </div>
  );
};

export default CashierLoginModal;
