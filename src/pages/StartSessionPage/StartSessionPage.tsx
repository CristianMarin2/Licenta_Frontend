import PosLayout from '../../components/layout/PosLayout';
import Numpad from '../../components/shared/Numpad';
import StartSessionPanel from './StartSessionPanel';
import useStartSessionPageLogic from './StartSessionPage.logic';

const StartSessionPage = () => {
  const {
    amount,
    message,
    handleKeyClick,
    handleSubmit,
    navigate,
  } = useStartSessionPageLogic();

  return (
    <PosLayout
      topLeft={
        <StartSessionPanel
          amount={amount}
          message={message}
          onSubmit={handleSubmit}
        />
      }

      bottomLeft={
        <div>
          <input
            type="text"
            value={amount}
            readOnly
            placeholder="Suma inițială (lei)"
            style={{
              fontSize: '1.5rem',
              textAlign: 'center',
              width: '100%',
              marginBottom: '1rem',
              padding: '0.75rem'
            }}
          />
          <Numpad onKeyClick={handleKeyClick} />
        </div>
      }

      right={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button onClick={handleSubmit}>Pornește sesiunea</button>
          <button onClick={() => navigate('/scan')}>Înapoi</button>
        </div>
      }
    />
  );
};

export default StartSessionPage;
