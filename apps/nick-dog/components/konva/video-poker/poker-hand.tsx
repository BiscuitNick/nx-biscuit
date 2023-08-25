import { Group, Text, Rect } from 'react-konva';
import { PokerCard, PokerCardBack } from './poker-card';

interface PokerHandProps {
  cards: number[];
  holds: boolean[];
  optimalHolds: boolean[];
  updateHolds: (index: number) => void;
  status: string;

  // Dimension & Positioning Props
  y: number;
  width: number;
  margin: number;
  cardWidth: number;
  cardHeight: number;
  xOffset: number;
  cardFontSize: number;
  cardStrokeWidth: number;
  buttonCornerRadius: number;
  buttonStrokeWidth: number;
  buttonY: number;
  buttonHeight: number;
  buttonTextHeight: number;
  buttonFontSize: number;
}

export const PokerHand = ({
  cards,
  holds,
  status,
  optimalHolds,
  updateHolds,
  y,
  margin,
  cardWidth,
  cardHeight,
  xOffset,
  cardFontSize,
  cardStrokeWidth,
  buttonCornerRadius,
  buttonStrokeWidth,
  buttonY,
  buttonHeight,
  buttonTextHeight,
  buttonFontSize,
}: PokerHandProps) => {
  return (
    <Group x={margin} y={y}>
      {cards.map((raw, i) => (
        <Group
          key={i}
          onClick={() => updateHolds(i)}
          onTouchStart={() => updateHolds(i)}
          x={xOffset * i}
        >
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
              height={buttonHeight}
              y={buttonY}
              fill="yellow"
              cornerRadius={buttonCornerRadius}
              stroke={optimalHolds[i] ? 'red' : ''}
              strokeWidth={buttonStrokeWidth}
            />
            <Text
              width={cardWidth}
              height={buttonTextHeight}
              y={buttonY}
              align="center"
              verticalAlign="middle"
              text={holds[i] ? 'CANCEL' : 'HOLD'}
              fontSize={buttonFontSize}
              fontStyle={'bold'}
              fill={'black'}
            />
          </Group>
        </Group>
      ))}
    </Group>
  );
};
