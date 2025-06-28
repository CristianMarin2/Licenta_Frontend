import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const useAdminPageLogic = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const toggleDropdown = () => setShowDropdown(prev => !prev);

  return {
    logout,
    handleNavigate,
    showDropdown,
    toggleDropdown,
  };
};

export default useAdminPageLogic;
