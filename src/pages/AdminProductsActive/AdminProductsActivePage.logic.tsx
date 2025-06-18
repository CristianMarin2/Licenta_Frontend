import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Product } from '../../types/Product';
import { useAuth } from '../../contexts/AuthContext';

const useAdminProductsActiveLogic = () => {
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

  const handleCloseModal = () => setShowModal(false);

  const handleSaved = () => {
    setShowModal(false);
    fetchProducts();
  };

  return {
    products,
    selectedProduct,
    showModal,
    logout,
    navigate,
    handleAdd,
    handleEdit,
    handleCloseModal,
    handleSaved
  };
};

export default useAdminProductsActiveLogic;
