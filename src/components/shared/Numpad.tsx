import './Numpad.css';

const keys = [
  '1', '2', '3', '<-',
  '4', '5', '6', '',
  '7', '8', '9', '',
  'C', '0', 'x', ''
];

interface NumpadProps {
  onKeyClick: (key: string) => void;
}

const Numpad: React.FC<NumpadProps> = ({ onKeyClick }) => {
  return (
    <div>
      <div className="numpad">
        {keys.map((key, index) =>
          key ? (
            <button key={index} onClick={() => onKeyClick(key)}>
              {key}
            </button>
          ) : (
            <div key={index} className="empty-slot" />
          )
        )}
      </div>
      <div className="numpad-enter">
        <button onClick={() => onKeyClick('ENTER')}>Enter</button>
      </div>
    </div>
  );
};

export default Numpad;
