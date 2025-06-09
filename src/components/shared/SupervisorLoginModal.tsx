import React, { useState } from 'react';
import '../../styles/SupervisorLoginModal.css';

interface SupervisorLoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const SupervisorLoginModal: React.FC<SupervisorLoginModalProps> = ({ onClose, onSuccess }) => {
  const [employeeCode, setEmployeeCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5032/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeCode, password })
      });

      if (!response.ok) {
        setError('Login invalid.');
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.role !== 'Supervisor' && data.role !== 'Admin') {
        setError('Acces permis doar pentru supervizori.');
        setLoading(false);
        return;
      }

      setLoading(false);
      onSuccess(); // trigger acțiunea permisă
      onClose(); // închide modalul

    } catch (err) {
      console.error(err);
      setError('Eroare la autentificare.');
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Autentificare supervizor</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Cod angajat"
            value={employeeCode}
            onChange={e => setEmployeeCode(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Parolă"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>Autentifică</button>
          <button type="button" onClick={onClose}>Renunță</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default SupervisorLoginModal;
