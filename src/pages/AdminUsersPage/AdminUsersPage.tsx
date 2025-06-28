import React from 'react';
import useAdminUsersLogic from './AdminUsersPage.logic';
import AdminUsersPanel from './AdminUserPanel';

const AdminUsersPage: React.FC = () => {
  const logic = useAdminUsersLogic();
  return <AdminUsersPanel {...logic} />;
};

export default AdminUsersPage;
