import React from 'react';
import { Product } from '../../types/Product';

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
}

const ProductTable: React.FC<Props> = ({ products, onEdit }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ borderBottom: '1px solid #ccc' }}>Cod</th>
          <th style={{ borderBottom: '1px solid #ccc' }}>Nume</th>
          <th style={{ borderBottom: '1px solid #ccc' }}>Preț</th>
          <th style={{ borderBottom: '1px solid #ccc' }}>TVA</th>
          <th style={{ borderBottom: '1px solid #ccc' }}>Activ</th>
          <th style={{ borderBottom: '1px solid #ccc' }}>Acțiuni</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.barcode}>
            <td>{p.barcode}</td>
            <td>{p.name}</td>
            <td>{p.price.toFixed(2)} lei</td>
            <td>{p.vatRate}%</td>
            <td>{p.isActive ? '✔️' : '❌'}</td>
            <td>
              <button onClick={() => onEdit(p)}>✏️ Editează</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
