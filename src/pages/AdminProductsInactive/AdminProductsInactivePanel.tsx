import React from 'react';
import ProductModal from '../../components/Modals/ProductModal';
import { Product } from '../../types/Product';

interface Props {
  products: Product[];
  selectedProduct: Product | null;
  showModal: boolean;
  logout: () => void;
  navigate: (path: string) => void;
  handleEdit: (product: Product) => void;
  handleCloseModal: () => void;
  handleSaved: () => void;
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

const AdminProductsInactivePanel: React.FC<Props> = ({
  products,
  selectedProduct,
  showModal,
  logout,
  navigate,
  handleEdit,
  handleCloseModal,
  handleSaved
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

      <h1>Produse inactive</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => navigate('/admin')}>Înapoi</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={thStyle}>Cod</th>
            <th style={thStyle}>Nume</th>
            <th style={thStyle}>Preț</th>
            <th style={thStyle}>TVA</th>
            <th style={thStyle}>Activ</th>
            <th style={thStyle}>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.barcode}>
              <td style={tdStyle}>{p.barcode}</td>
              <td style={tdStyle}>{p.name}</td>
              <td style={tdStyle}>{p.price.toFixed(2)}</td>
              <td style={tdStyle}>{(p.vatRate * 100).toFixed(0)}%</td>
              <td style={tdStyle}>{p.isActive ? 'Active' : 'Inactive'}</td>
              <td style={tdStyle}>
                <button onClick={() => handleEdit(p)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
};

export default AdminProductsInactivePanel;
