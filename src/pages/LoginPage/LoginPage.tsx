import PosLayout from '../../components/layout/PosLayout';
import Numpad from '../../components/shared/Numpad';
import LoginPanel from './LoginPanel';
import Buttons from './/Buttons';
import useLoginPageLogic from './LoginPage.logic';

const LoginPage = () => {
  const {
    employeeCode,
    password,
    message,
    handleKeyClick,
    handleSubmit,
    handleFocusInput,
  } = useLoginPageLogic();

  return (
    <PosLayout
      topLeft={
        <LoginPanel
          employeeCode={employeeCode}
          password={password}
          message={message}
          onSubmit={handleSubmit}
          onFocusInput={handleFocusInput}
        />
      }
      bottomLeft={<Numpad onKeyClick={handleKeyClick} />}
      right={<Buttons />}
      
    />
  );
};

export default LoginPage;
