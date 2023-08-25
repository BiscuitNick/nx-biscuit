import '../../styles/playing-cards.css';
import { Card } from './card';

interface CardRowProps {
  raws: number[];
}

export const CardRow = (props: CardRowProps) => {
  const { raws } = props;
  return (
    <div className="card-row">
      {raws.map((x, i) => (
        <div key={i} className="card-wrapper">
          <Card raw={x} />
        </div>
      ))}
    </div>
  );
};

interface CardRowHoldsProps {
  raws: number[];
  holds: boolean[];
}

export const CardRowHolds = (props: CardRowHoldsProps) => {
  const { raws, holds } = props;
  return (
    <div className="card-row">
      {raws.map((x, i) => (
        <div
          key={i}
          className="card-wrapper"
          style={{
            border: holds[i] ? '3px solid red' : 'none',
            background: holds[i] ? 'red' : 'none',
          }}
        >
          <Card raw={x} />
        </div>
      ))}
    </div>
  );
};
