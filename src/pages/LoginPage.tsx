import { useState } from 'react';
import PosLayout from '../components/layout/PosLayout';
import Numpad from '../components/shared/Numpad';
import LoginForm from '../components/forms/LoginForm';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [employeeCode, setEmployeeCode] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [activeInput, setActiveInput] = useState<'employeeCode' | 'password'>('employeeCode');
  const { login } = useAuth();

  const handleKeyClick = (key: string) => {
    const updater = activeInput === 'employeeCode' ? setEmployeeCode : setPassword;
    updater((prev) => key === '<-' ? prev.slice(0, -1) : prev + key);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(employeeCode, password);
    } catch {
      setMessage('Autentificare eșuată.');
    }
  };

  return (
    <PosLayout
      topLeft={
        <LoginForm
          employeeCode={employeeCode}
          password={password}
          message={message}
          onFocusInput={setActiveInput}
          onSubmit={handleSubmit}
        />
      }
      bottomLeft={<Numpad onKeyClick={handleKeyClick} />}
      right={
        <div className="login-right-buttons">
          <button onClick={() => window.location.reload()}>Reîncearcă</button>
        </div>
      }
    />
  );
};

export default LoginPage;
