import React from 'react';
import { User } from './AdminUsersPage.logic';
import UserModal from '../../components/Modals/UserModal';

interface Props {
  users: User[];
  logout: () => void;
  navigate: (path: string) => void;
  toggleUserActiveStatus: (employeeCode: string, currentStatus: boolean) => void;
  createUser: (newUser: Omit<User, 'employeeCode'> & { employeeCode: string }) => void;
  updateUser: (data: Omit<User, 'employeeCode'>, employeeCode?: string) => void;
  modalUser: User | null;
  addMode: boolean;
  openAddModal: () => void;
  openEditModal: (user: User) => void;
  handleSave: (data: Omit<User, 'employeeCode'>, employeeCode?: string) => void;
  closeModal: () => void;
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '0.5rem',
  borderBottom: '1px solid #ccc'
};

const tdStyle: React.CSSProperties = {
  padding: '0.5rem',
  borderBottom: '1px solid #eee'
};

const AdminUsersPanel: React.FC<Props> = ({
  users,
  logout,
  navigate,
  toggleUserActiveStatus,
  modalUser,
  addMode,
  openAddModal,
  openEditModal,
  handleSave,
  closeModal
}) => {
  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
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
        Logout
      </button>

      <h1>Administrare casieri</h1>

      <button
        onClick={navigate.bind(null, '/admin')}
        style={{ marginBottom: '1rem', marginRight: '1rem', padding: '0.5rem 1rem' }}
      >
        Înapoi
      </button>

      <button
        onClick={openAddModal}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
         Adaugă casier
      </button>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={thStyle}>Cod</th>
            <th style={thStyle}>Username</th>
            <th style={thStyle}>Rol</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.employeeCode}>
              <td style={tdStyle}>{user.employeeCode}</td>
              <td style={tdStyle}>{user.username}</td>
              <td style={tdStyle}>{user.role}</td>
              <td style={tdStyle}>{user.isActive ? 'Activ' : 'Inactiv'}</td>
              <td style={tdStyle}>
                
                <button
                  style={{ color: user.isActive ? 'red' : 'green' }}
                  onClick={() => toggleUserActiveStatus(user.employeeCode, user.isActive)}
                >
                  {user.isActive ? 'Dezactivează' : 'Activează'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(modalUser || addMode) && (
        <UserModal user={modalUser} onClose={closeModal} onSave={handleSave} />
      )}
    </div>
  );
};

export default AdminUsersPanel;
