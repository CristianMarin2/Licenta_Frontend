import React from 'react';
import './LoginPage.css';

interface LoginPanelProps {
  employeeCode: string;
  password: string;
  message: string;
  onFocusInput: (field: 'employeeCode' | 'password') => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginPanel: React.FC<LoginPanelProps> = ({
  employeeCode,
  password,
  message,
  onFocusInput,
  onSubmit,
}) => {
  return (
    <div className="login-form">
      <h3>Autentificare casier</h3>
      <form onSubmit={onSubmit}>
        <label>Cod angajat</label>
        <input
          type="text"
          value={employeeCode}
          onFocus={() => onFocusInput('employeeCode')}
          readOnly
        />
        <label>Parolă</label>
        <input
          type="password"
          value={password}
          onFocus={() => onFocusInput('password')}
          readOnly
        />
        <button type="submit">Autentifică-te</button>
      </form>
      {message && <div className="error-message">{message}</div>}
    </div>
  );
};

export default LoginPanel;
