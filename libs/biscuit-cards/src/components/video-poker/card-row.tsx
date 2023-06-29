import { FlipCard } from '../cards/flip-card';

interface CardRowProps {
  cards: number[];
  holds: boolean[];
  updateHolds: (index: number) => void;
  status: string;
}

export const CardRow = ({
  cards,
  holds,
  updateHolds,
  status,
}: CardRowProps) => {
  return (
    <div className="card-row">
      {cards.map((card, index) => (
        <div key={index}>
          <div className="hold-text">{holds[index] ? 'HOLD' : ''}</div>
          <FlipCard
            key={index}
            raw={card}
            show={card !== -1 && (holds[index] || !status.includes('dealing'))}
            handleClick={() => updateHolds(index)}
            height={168}
            width={120}
          />
          <button style={{ width: 120 }}>d</button>
        </div>
      ))}
    </div>
  );
};
