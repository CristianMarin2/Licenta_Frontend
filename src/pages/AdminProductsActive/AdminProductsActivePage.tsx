import React from 'react';
import useAdminProductsActiveLogic from './AdminProductsActivePage.logic';
import AdminProductsActivePanel from './AdminProductsActivePanel';

const AdminProductsActivePage: React.FC = () => {
  const logic = useAdminProductsActiveLogic();
  return <AdminProductsActivePanel {...logic} />;
};

export default AdminProductsActivePage;
