import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

type User = {
  employeeCode: string;
  username: string;
  role: string;
};

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Eroare la fetch utilizatori:', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      {/* Buton Logout */}
      <button
        onClick={logout}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          backgroundColor: '#dc3545',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        🚪 Logout
      </button>

      {/* Titlu și Înapoi */}
      <h1>Administrare casieri</h1>
      <button
        onClick={() => navigate('/admin')}
        style={{ marginBottom: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        ⬅️ Înapoi
      </button>

      {/* Tabel utilizatori */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={thStyle}>Cod</th>
            <th style={thStyle}>Username</th>
            <th style={thStyle}>Rol</th>
            <th style={thStyle}>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.employeeCode}>
              <td style={tdStyle}>{user.employeeCode}</td>
              <td style={tdStyle}>{user.username}</td>
              <td style={tdStyle}>{user.role}</td>
              <td style={tdStyle}>
                <button style={{ marginRight: '0.5rem' }}>✏️ Editează</button>
                <button style={{ color: 'red' }}>🗑️ Dezactivează</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Stiluri reutilizabile
const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '0.5rem',
  borderBottom: '1px solid #ccc'
};

const tdStyle: React.CSSProperties = {
  padding: '0.5rem',
  borderBottom: '1px solid #eee'
};

export default AdminUsersPage;
