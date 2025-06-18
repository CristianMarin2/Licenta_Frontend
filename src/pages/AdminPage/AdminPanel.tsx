import React from 'react';

interface AdminPanelProps {
  logout: () => void;
  handleNavigate: (path: string) => void;
  showDropdown: boolean;
  toggleDropdown: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  logout,
  handleNavigate,
  showDropdown,
  toggleDropdown,
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

      <h1>Panou administrare</h1>

      <button
        onClick={() => handleNavigate('/admin/users')}
        style={{
          fontSize: '1.2rem',
          margin: '1rem',
          padding: '1rem 2rem',
          cursor: 'pointer'
        }}
      >
         Administrare casieri
      </button>

      <div style={{ position: 'relative', display: 'inline-block', margin: '1rem' }}>
        <button
          onClick={toggleDropdown}
          style={{
            fontSize: '1.2rem',
            padding: '1rem 2rem',
            cursor: 'pointer'
          }}
        >
           Administrare produse ▾
        </button>

        {showDropdown && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
              zIndex: 10
            }}
          >
            <button
              onClick={() => handleNavigate('/admin/products/active')}
              style={{ padding: '0.5rem 1rem', width: '100%', textAlign: 'left', cursor: 'pointer' }}
            >
               Produse active
            </button>
            <button
              onClick={() => handleNavigate('/admin/products/inactive')}
              style={{ padding: '0.5rem 1rem', width: '100%', textAlign: 'left', cursor: 'pointer' }}
            >
               Produse inactive
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
