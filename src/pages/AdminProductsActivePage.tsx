import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Product } from '../types/Product';
import ProductModal from '../components/admin/ProductModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminProductsActivePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products/active');
      setProducts(res.data);
    } catch (err) {
      console.error('Eroare la fetch produse:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

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

      <h1>Produse active</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => navigate('/admin')} style={{ marginRight: '1rem' }}>
          ⬅️ Înapoi
        </button>
        <button onClick={handleAdd}>➕ Adaugă produs</button>
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
              <td style={tdStyle}>{p.isActive ? '✔️' : '❌'}</td>
              <td style={tdStyle}>
                <button onClick={() => handleEdit(p)}>✏️ Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
          onSaved={() => {
            setShowModal(false);
            fetchProducts();
          }}
        />
      )}
    </div>
  );
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '0.5rem',
  borderBottom: '1px solid #ccc'
};

const tdStyle: React.CSSProperties = {
  padding: '0.5rem',
  borderBottom: '1px solid #eee'
};

export default AdminProductsActivePage;
