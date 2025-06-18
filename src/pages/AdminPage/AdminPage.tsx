import React from 'react';
import useAdminPageLogic from './AdminPage.logic';
import AdminPanel from './AdminPanel';

const AdminPage: React.FC = () => {
  const logic = useAdminPageLogic();
  return <AdminPanel {...logic} />;
};

export default AdminPage;
