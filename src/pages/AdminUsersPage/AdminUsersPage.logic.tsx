import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export type User = {
  employeeCode: string;
  username: string;
  role: string;
  isActive: boolean;
};

const useAdminUsersLogic = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalUser, setModalUser] = useState<User | null>(null);
  const [addMode, setAddMode] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Eroare la fetch utilizatori:', err);
    }
  };

  const toggleUserActiveStatus = async (employeeCode: string, currentStatus: boolean) => {
    try {
      await api.put(`/users/${employeeCode}/active`, !currentStatus);
      fetchUsers();
    } catch (err) {
      console.error('Eroare la activare/dezactivare utilizator:', err);
    }
  };

  const createUser = async (newUser: Omit<User, 'employeeCode'> & { employeeCode: string }) => {
    try {
      await api.post('/users', {
        employeeCode: newUser.employeeCode,
        username: newUser.username,
        passwordHash: newUser.employeeCode,
        role: newUser.role,
      });
      await api.put(`/users/${newUser.employeeCode}/active`, newUser.isActive);
      fetchUsers();
    } catch (err) {
      console.error('Eroare la creare utilizator:', err);
    }
  };

  const updateUser = async (data: Omit<User, 'employeeCode'>, employeeCode?: string) => {
    if (!employeeCode) return;
    try {
      await api.put(`/users/${employeeCode}`, data);
      fetchUsers();
    } catch (err) {
      console.error('Eroare la actualizare utilizator:', err);
    }
  };

  const openAddModal = () => {
    setModalUser(null);
    setAddMode(true);
  };

  const openEditModal = (user: User) => {
    setModalUser(user);
    setAddMode(false);
  };

const handleSave = async (data: Omit<User, 'employeeCode'>, employeeCode?: string) => {
  if (addMode) {
    if (!employeeCode?.trim()) {
      return alert('Codul angajatului este obligatoriu!');
    }
    await createUser({ ...data, employeeCode });
  } else if (employeeCode) {
    await updateUser(data, employeeCode);
  }
  setModalUser(null);
  setAddMode(false);
};

  const closeModal = () => {
  setModalUser(null);
  setAddMode(false);
};

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    logout,
    navigate,
    toggleUserActiveStatus,
    createUser,
    updateUser,
    modalUser,
    addMode,
    openAddModal,
    openEditModal,
    handleSave,
    closeModal
  };
};

export default useAdminUsersLogic;
