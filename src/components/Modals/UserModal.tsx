import React, { useEffect, useState } from 'react';
import { User } from '../../pages/AdminUsersPage/AdminUsersPage.logic';
import './Modal.css';

interface Props {
  user: User | null;
  onClose: () => void;
  onSave: (data: Omit<User, 'employeeCode'>, employeeCode?: string) => void;
}

const UserModal: React.FC<Props> = ({ user, onClose, onSave }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('Cashier');
  const [isActive, setIsActive] = useState(true);
  const [employeeCode, setEmployeeCode] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setRole(user.role);
      setIsActive(user.isActive);
      setEmployeeCode(user.employeeCode);
    } else {
      setUsername('');
      setRole('Cashier');
      setIsActive(true);
      setEmployeeCode('');
    }
  }, [user]);

  const handleSubmit = () => {
    if (!username.trim()) return alert('Username lipsă');
    if (!user && !employeeCode.trim()) return alert('Cod angajat lipsă');

    onSave({ username, role, isActive }, user ? undefined : employeeCode);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{user ? 'Editează utilizator' : 'Adaugă utilizator'}</h3>

        {!user && (
          <input
            type="text"
            placeholder="Cod angajat"
            value={employeeCode}
            onChange={e => setEmployeeCode(e.target.value)}
          />
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          style={{ width: '100%', fontSize: '1.1rem', padding: '0.5rem', marginBottom: '1rem' }}
        >
          <option value="Cashier">Cashier</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Admin">Admin</option>
        </select>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          <input
            type="checkbox"
            checked={isActive}
            onChange={e => setIsActive(e.target.checked)}
          />{' '}
          Activ
        </label>

        <div>
          <button type="button" className="confirm" onClick={handleSubmit}>
            Salvează
          </button>
          <button type="button" className="cancel" onClick={onClose}>
            Anulează
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
