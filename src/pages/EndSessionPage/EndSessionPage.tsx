import PosLayout from '../../components/layout/PosLayout';
import Numpad from '../../components/shared/Numpad';
import EndSessionPanel from './EndSessionPanel';
import useEndSessionPageLogic from './EndSessionPage.logic';

const EndSessionPage = () => {
  const {
    session,
    declaredAmount,
    handleKeyClick,
    handleSubmit,
    navigate,
  } = useEndSessionPageLogic();

  return (
    <PosLayout
      topLeft={
        <EndSessionPanel
          session={session}
          declaredAmount={declaredAmount}
          onSubmit={handleSubmit}
        />
      }

      bottomLeft={
        <div>
          <input
            type="text"
            value={declaredAmount}
            readOnly
            placeholder="Suma declarată"
            style={{
              width: '100%',
              fontSize: '1.5rem',
              textAlign: 'center',
              padding: '0.8rem',
              marginBottom: '1rem',
            }}
          />
          <Numpad onKeyClick={handleKeyClick} />
        </div>
      }

      right={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button
            onClick={() => navigate('/scan')}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              padding: '1rem',
              fontSize: '1.2rem',
              border: 'none',
              borderRadius: '6px',
            }}
          >
            Înapoi
          </button>
        </div>
      }
    />
  );
};

export default EndSessionPage;
