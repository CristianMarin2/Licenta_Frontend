import React from 'react';
import useAdminProductsInactiveLogic from './AdminProductsInactive.logic';
import AdminProductsInactivePanel from './AdminProductsInactivePanel';

const AdminProductsInactivePage: React.FC = () => {
  const logic = useAdminProductsInactiveLogic();
  return <AdminProductsInactivePanel {...logic} />;
};

export default AdminProductsInactivePage;
