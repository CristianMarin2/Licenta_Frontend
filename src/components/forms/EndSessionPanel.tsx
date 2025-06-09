import React from 'react';

interface EndSessionPanelProps {
  session: { startTime: string } | null;
  declaredAmount: string;
  onSubmit: () => void;
}

const EndSessionPanel: React.FC<EndSessionPanelProps> = ({
  session,
  declaredAmount,
  onSubmit,
}) => {
  return (
    <div>
      <h3>Închidere sesiune casier</h3>
      {session ? (
        <>
          <p>
            Sesiune activă începută la:{' '}
            <strong>{new Date(session.startTime).toLocaleString()}</strong>
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            Suma declarată încasată: <strong>{declaredAmount || '—'} lei</strong>
          </p>
          <button
            onClick={onSubmit}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#dc3545',
              color: 'white',
              fontSize: '1.2rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Închide sesiunea
          </button>
        </>
      ) : (
        <p>Nu există sesiune activă.</p>
      )}
    </div>
  );
};

export default EndSessionPanel;
