import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Product } from '../../types/Product';
import { useAuth } from '../../contexts/AuthContext';

const useAdminProductsInactiveLogic = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products/inactive');
      setProducts(res.data);
    } catch (err) {
      console.error('Eroare la fetch produse inactive:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
    handleEdit,
    handleCloseModal,
    handleSaved
  };
};

export default useAdminProductsInactiveLogic;
