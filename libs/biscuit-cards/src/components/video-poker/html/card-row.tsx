// import { FlipCard } from '../cards/flip-card';
import { FlipCard } from '../../cards/flip-card';
import { PokerButton } from './poker-button';
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
        <div key={index} style={{ display: 'grid', gridGap: 5 }}>
          <div className="hold-text">{holds[index] ? 'HOLD' : ''}</div>
          <FlipCard
            key={index}
            raw={card}
            show={card !== -1 && (holds[index] || !status.includes('dealing'))}
            handleClick={() => updateHolds(index)}
            height={168}
            width={120}
          />
          <PokerButton
            handleClick={() => updateHolds(index)}
            text={holds[index] ? 'CANCEL' : 'HOLD'}
            background={'yellow'}
            disabled={status.includes('dealing') || status === 'pendingNewGame'}
          />
        </div>
      ))}
    </div>
  );
};
