import { Card } from './card';
import { useState } from 'react';

interface FlipCardProps {
  show: boolean;
  raw: number;
  width?: number;
  height?: number;

  handleClick: () => void;
}

export const FlipCard = (props: FlipCardProps) => {
  const { show, raw, height = 147, width = 105, handleClick } = props;

  // const [flip, setFlip] = useState(show);

  return (
    <div
      className="flip-card-wrapper"
      style={{
        height,
        width,
      }}
      onClick={handleClick}
    >
      <div
        className="flip-card-inner"
        style={{
          transform: show ? 'rotateY(0deg)' : 'rotateY(180deg)',
        }}
      >
        <div className="flip-card-front">
          {raw !== -1 && <Card raw={raw} />}
        </div>
        <div className="flip-card-back" />
      </div>
    </div>
  );
};
