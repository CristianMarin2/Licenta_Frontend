import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const useLoginPageLogic = () => {
  const [employeeCode, setEmployeeCode] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [activeInput, setActiveInput] = useState<'employeeCode' | 'password'>('employeeCode');
  const { login } = useAuth();

  const handleKeyClick = (key: string) => {
    if (key === 'Enter'.toUpperCase() || key === 'x') return;

    const updater = activeInput === 'employeeCode' ? setEmployeeCode : setPassword;
    updater((prev) => (key === '<-' ? prev.slice(0, -1) : prev + key));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(employeeCode, password);
    } catch {
      setMessage('Autentificare eșuată.');
    }
  };

  const handleFocusInput = (input: 'employeeCode' | 'password') => {
    setActiveInput(input);
  };

  return {
    employeeCode,
    password,
    message,
    handleKeyClick,
    handleSubmit,
    handleFocusInput,
  };
};

export default useLoginPageLogic;
