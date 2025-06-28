import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useSelfCheckout } from './SelfCheckoutContext';

type Role = 'Cashier' | 'Supervisor' | 'Admin';

type User = {
  employeeCode: string;
  username?: string;
  role: Role;
};

interface AuthContextType {
  user: User | null;
  login: (employeeCode: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const navigate = useNavigate();
  const { isSelfCheckout } = useSelfCheckout();

  const login = async (employeeCode: string, password: string) => {
    const response = await api.post('/users/login', { employeeCode, password });
    const userData: User = response.data;

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));

    if (userData.role === 'Admin') {
  navigate('/admin');
  return;
}

    const sesResp = await api.get('/salesession/active');
    const activeSession = sesResp.data.find((s: any) => s.cashierCode === userData.employeeCode);

    if (activeSession) {
      navigate(userData.employeeCode === '9999' ? '/self/scan' : '/scan');
    } else {
      navigate('/start-session');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    const tryAutoLogin = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) return;

        const response = await api.post('/users/login', {
          employeeCode: '9999',
          password: '1234'
        });

        const userData: User = response.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/self/scan');
      } catch (err) {
        console.error('Autologin SELF_1 eșuat:', err);
      }
    };

    if (isSelfCheckout && !user) {
      tryAutoLogin();
    }
  }, [isSelfCheckout]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
