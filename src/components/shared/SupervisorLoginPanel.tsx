import React from 'react';

interface SupervisorLoginPanelProps {
  inputs: { employeeCode: string; password: string };
  onChangeField: (value: { employeeCode: string; password: string }) => void;
  onFocusField: (field: 'supervisorCode' | 'supervisorPass') => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const SupervisorLoginPanel: React.FC<SupervisorLoginPanelProps> = ({
  inputs,
  onChangeField,
  onFocusField,
  onSubmit,
  onCancel
}) => {
  const handleInputChange = (field: 'employeeCode' | 'password', value: string) => {
    onChangeField({ ...inputs, [field]: value });
  };

  return (
    <div className="buttons">
      <h3>Autentificare Supervizor</h3>
      <input
        type="text"
        placeholder="Cod angajat"
        value={inputs.employeeCode}
        onClick={() => onFocusField('supervisorCode')}
        onChange={(e) => handleInputChange('employeeCode', e.target.value)}
        autoFocus
      />
      <input
        type="password"
        placeholder="Parolă"
        value={inputs.password}
        onClick={() => onFocusField('supervisorPass')}
        onChange={(e) => handleInputChange('password', e.target.value)}
      />
      <button onClick={onSubmit}>Autentifică</button>
      <button onClick={onCancel}>Renunță</button>
    </div>
  );
};

export default SupervisorLoginPanel;
