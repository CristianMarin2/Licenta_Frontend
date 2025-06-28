import React from 'react';

interface EndSessionPanelProps {
  session: { startTime: string } | null;
  declaredAmount: string;
}

const EndSessionPanel: React.FC<EndSessionPanelProps> = ({
  session,
  declaredAmount,
}) => {
  return (
    <div className="end-session-panel">
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
        </>
      ) : (
        <p>Nu există sesiune activă.</p>
      )}
    </div>
  );
};

export default EndSessionPanel;
