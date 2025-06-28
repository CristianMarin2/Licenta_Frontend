import './EndSessionPage.css';
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
        />
      }

      bottomLeft={
        <div>
          <input
            type="text"
            value={declaredAmount}
            readOnly
            placeholder="Suma declarată"
            className="declared-amount-input"
          />
          <Numpad onKeyClick={handleKeyClick} />
        </div>
      }

      right={
        <div className="end-session-buttons">
          <button
            onClick={handleSubmit}
            className="submit-button"
          >
            Închide sesiunea
          </button>
          <button
            onClick={() => navigate('/scan')}
            className="back-button"
          >
            Înapoi
          </button>
        </div>
      }
    />
  );
};

export default EndSessionPage;
