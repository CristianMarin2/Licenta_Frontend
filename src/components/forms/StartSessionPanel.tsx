interface StartSessionPanelProps {
  amount: string;
  message: string;
  onSubmit: () => void;
}

const StartSessionPanel: React.FC<StartSessionPanelProps> = ({
  amount,
  message,
  onSubmit
}) => {
  return (
    <div>
      <h3>Start sesiune casier</h3>
      <p style={{ fontSize: '1.3rem', marginBottom: '1rem', textAlign: 'center' }}>
        Suma introdusă: <strong>{amount || '—'} lei</strong>
      </p>
      {message && (
        <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
          {message}
        </div>
      )}
      <button
        onClick={onSubmit}
        style={{
          width: '100%',
          padding: '1rem',
          backgroundColor: '#007bff',
          color: 'white',
          fontSize: '1.2rem',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Pornește sesiunea
      </button>
    </div>
  );
};

export default StartSessionPanel;
