import React, { useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import { useCart } from '../../contexts/CartContext';
import api from '../../services/api';

interface Props {
  onClose: () => void;
}

const ImportQrModal: React.FC<Props> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addProduct } = useCart();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      const reader = new BrowserQRCodeReader();
      const result = await reader.decodeFromImageUrl(URL.createObjectURL(file));
      const rawData = result.getText();

      const decoded = JSON.parse(rawData);
      if (!Array.isArray(decoded)) throw new Error('QR invalid');

      for (const item of decoded) {
        const response = await api.get(`/products?barcode=${item.barcode}`);
        const product = response.data;

        if (product) {
          addProduct(product, item.quantity || 1);
        }
      }

      onClose();
    } catch (err) {
      console.error(err);
      setError('Eroare la citirea codului QR.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Importă coș din cod QR</h3>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        {loading && <p>Se procesează imaginea...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={onClose} style={{ marginTop: '1rem' }}>Închide</button>
      </div>
    </div>
  );
};

export default ImportQrModal;
