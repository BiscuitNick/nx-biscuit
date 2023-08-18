import { Group, Text, Rect } from 'react-konva';

interface BottomButtonsProps {
  // cards: number[];
  // holds: boolean[];
  // updateHolds: (index: number) => void;
  status: string;
  marginFactor?: number;
  w2hRatio?: number;
  width: number;
  y: number;

  minusBet: () => void;
  betOne: () => void;
  betMax: () => void;
  dealOrDraw: () => void;
  toggleOptions: () => void;
}

export const BottomButtonRow = ({
  // cards,
  // holds,
  // updateHolds,
  marginFactor = 0.01,
  w2hRatio = 1.4,
  width,
  y,
  status,

  minusBet,
  betOne,
  betMax,
  dealOrDraw,
  toggleOptions,
}: BottomButtonsProps) => {
  const margin = Math.round(width * marginFactor);
  const cardWidth = Math.round((width - margin * 6) / 5);
  const cardHeight = Math.round(cardWidth * w2hRatio);
  const xOffset = cardWidth + margin;
  // const cardFontSize = Math.round(cardHeight * 0.2);
  // const cardStrokeWidth = Math.round(cardHeight * 0.01);

  // console.log(xOffset, y);

  return (
    <Group x={margin} y={y}>
      <Group onClick={toggleOptions} x={0}>
        <Rect
          width={cardWidth}
          height={cardHeight * 0.2}
          // y={cardHeight + margin}
          fill="black"
          cornerRadius={cardHeight * 0.02}
        />
        <Text
          width={cardWidth}
          height={Math.round(cardHeight * 0.21)}
          // y={cardHeight + margin} // + cardHeight * 0.05
          align="center"
          verticalAlign="middle"
          text={'Options'}
          fontSize={Math.round(cardHeight * 0.1)}
          fontStyle={'bold'}
          fill={'white'}
        />
      </Group>
      <Group
        onClick={minusBet}
        x={xOffset}
        opacity={status !== 'pendingNewGame' ? 0.5 : 1}
      >
        <Rect
          width={cardWidth}
          height={cardHeight * 0.2}
          // y={cardHeight + margin}
          fill="white"
          cornerRadius={cardHeight * 0.02}
        />
        <Text
          width={cardWidth}
          height={Math.round(cardHeight * 0.21)}
          // y={cardHeight + margin} // + cardHeight * 0.05
          align="center"
          verticalAlign="middle"
          text={'Bet -'}
          fontSize={Math.round(cardHeight * 0.1)}
          fontStyle={'bold'}
          fill={'black'}
        />
      </Group>
      <Group
        onClick={betOne}
        x={xOffset * 2}
        opacity={status !== 'pendingNewGame' ? 0.5 : 1}
      >
        <Rect
          width={cardWidth}
          height={cardHeight * 0.2}
          // y={cardHeight + margin}
          fill="white"
          cornerRadius={cardHeight * 0.02}
        />
        <Text
          width={cardWidth}
          height={Math.round(cardHeight * 0.21)}
          // y={cardHeight + margin} // + cardHeight * 0.05
          align="center"
          verticalAlign="middle"
          text={'Bet +'}
          fontSize={Math.round(cardHeight * 0.1)}
          fontStyle={'bold'}
          fill={'black'}
        />
      </Group>
      <Group
        onClick={betMax}
        x={xOffset * 3}
        opacity={status !== 'pendingNewGame' ? 0.5 : 1}
      >
        <Rect
          width={cardWidth}
          height={cardHeight * 0.2}
          fill="white"
          cornerRadius={cardHeight * 0.02}
        />
        <Text
          width={cardWidth}
          height={Math.round(cardHeight * 0.21)}
          align="center"
          verticalAlign="middle"
          text={'Max Bet'}
          fontSize={Math.round(cardHeight * 0.1)}
          fontStyle={'bold'}
          fill={'black'}
        />
      </Group>
      <Group
        onClick={dealOrDraw}
        x={xOffset * 4}
        opacity={status.includes('dealing') ? 0.5 : 1}
      >
        <Rect
          width={cardWidth}
          height={cardHeight * 0.2}
          // y={cardHeight + margin}
          fill="green"
          cornerRadius={cardHeight * 0.02}
        />
        <Text
          width={cardWidth}
          height={Math.round(cardHeight * 0.21)}
          // y={cardHeight + margin} // + cardHeight * 0.05
          align="center"
          verticalAlign="middle"
          text={status === 'pendingDraw' ? 'Draw' : 'Deal'}
          fontSize={Math.round(cardHeight * 0.1)}
          fontStyle={'bold'}
          fill={'white'}
        />
      </Group>
    </Group>
  );
};
