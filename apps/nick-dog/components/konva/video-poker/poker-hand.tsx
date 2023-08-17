import { Group, Text, Rect } from 'react-konva';
import { PokerCard, PokerCardBack } from './poker-card';

interface PokerHandProps {
  cards: number[];
  holds: boolean[];
  optimalHolds: boolean[];
  updateHolds: (index: number) => void;
  status: string;

  marginFactor?: number;
  w2hRatio?: number;
  width: number;
  y: number;
}

export const PokerHand = ({
  cards,
  holds,
  updateHolds,
  marginFactor = 0.01,
  w2hRatio = 1.4,
  width,
  y,
  status,
  optimalHolds,
}: PokerHandProps) => {
  const margin = width * marginFactor;
  const cardWidth = Math.round((width - margin * 6) / 5);
  const cardHeight = Math.round(cardWidth * w2hRatio);
  const xOffset = cardWidth + margin;
  const cardFontSize = Math.round(cardHeight * 0.2);
  const cardStrokeWidth = Math.round(cardHeight * 0.01);

  return (
    <Group x={margin} y={y}>
      {cards.map((raw, i) => (
        <Group key={i} onClick={() => updateHolds(i)} x={xOffset * i}>
          {raw > -1 && status !== 'dealingCards' ? (
            status === 'dealingDraw' && !holds[i] ? (
              <PokerCardBack width={cardWidth} height={cardHeight} />
            ) : (
              <PokerCard width={cardWidth} height={cardHeight} raw={raw} />
            )
          ) : (
            <PokerCardBack width={cardWidth} height={cardHeight} />
          )}
          <Text
            align="center"
            verticalAlign="middle"
            height={cardHeight}
            width={cardWidth}
            text={holds[i] ? 'HOLD' : ''}
            fontSize={cardFontSize}
            fontStyle={'bold'}
            fill={'white'}
            stroke={'black'}
            strokeWidth={cardStrokeWidth}
          />
          <Group
            opacity={
              status === 'pendingNewGame' ||
              status === 'pendingPayouts' ||
              status.includes('dealing')
                ? 0.5
                : 1
            }
          >
            <Rect
              width={cardWidth}
              height={cardHeight * 0.18}
              y={cardHeight + margin}
              fill="yellow"
              cornerRadius={cardHeight * 0.02}
              stroke={optimalHolds[i] ? 'red' : ''}
              strokeWidth={cardStrokeWidth * 2}
            />
            <Text
              width={cardWidth}
              height={Math.round(cardHeight * 0.19)}
              y={cardHeight + margin} // + cardHeight * 0.05
              align="center"
              verticalAlign="middle"
              text={holds[i] ? 'CANCEL' : 'HOLD'}
              fontSize={Math.round(cardHeight * 0.1)}
              fontStyle={'bold'}
              fill={'black'}
            />
          </Group>
        </Group>
      ))}
    </Group>
  );
};
