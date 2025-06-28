import React, { useState } from 'react';
import { Product } from '../../types/Product';
import api from '../../services/api';

interface Props {
  product: Product | null;
  onClose: () => void;
  onSaved: () => void;
}

const ProductModal: React.FC<Props> = ({ product, onClose, onSaved }) => {
  const [form, setForm] = useState<Product>(() => {
    return product ?? {
      barcode: '',
      name: '',
      price: 0,
      vatRate: 0.19,
      isActive: true
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    const newValue =
      type === 'checkbox'
        ? checked
        : name === 'price'
        ? parseFloat(value)
        : name === 'vatRate'
        ? parseFloat(value) / 100
        : value;

    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (product) {
        await api.put(`/products/${product.barcode}`, form);
      } else {
        await api.post('/products', form);
      }
      onSaved();
    } catch (err) {
      console.error('Eroare la salvare produs:', err);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}
    >
      <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', minWidth: '300px' }}>
        <h3>{product ? 'Editează produs' : 'Adaugă produs'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="barcode"
            placeholder="Cod de bare"
            value={form.barcode}
            onChange={handleChange}
            disabled={!!product}
            required
          />
          <input
            name="name"
            placeholder="Nume"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Preț"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            name="vatRate"
            type="number"
            step="0.01"
            placeholder="TVA (%)"
            value={(form.vatRate * 100).toFixed(0)}
            onChange={handleChange}
            required
          />
          <label>
            <input
              name="isActive"
              type="checkbox"
              checked={form.isActive}
              onChange={handleChange}
            />
            Activ
          </label>
          <div style={{ marginTop: '1rem' }}>
            <button type="submit">💾 Salvează</button>
            <button onClick={onClose} style={{ marginLeft: '1rem' }}>Anulează</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
