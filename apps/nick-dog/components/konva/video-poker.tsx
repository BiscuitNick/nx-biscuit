import { useEffect } from 'react';
import { useVideoPoker } from '@nx-biscuit/biscuit-cards';
import { Stage, Layer, Rect } from 'react-konva';

interface BackgroundRect {
  width: number;
  height: number;
  color?: string;
}

interface PayScheduleRect {
  width: number;
  height: number;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}

interface VideoPokerCanvasProps {
  width?: number;
  height?: number;
  style?: any;
}

const BackgroundRect = ({ width, height, color = 'blue' }: BackgroundRect) => {
  return <Rect fill={color} width={width} height={height} />;
};

const PayScheduleRect = ({
  width,
  height,
  backgroundColor = '#2c2c2c',
  textColor = 'yellow',
  borderColor = 'yellow',
}: PayScheduleRect) => {
  const margin = width * 0.01;
  const adjustedWidth = width - margin * 2;

  return (
    <Rect
      x={margin}
      y={margin}
      fill={backgroundColor}
      width={adjustedWidth}
      height={height}
      stroke={borderColor}
    />
  );
};

// const Cards = () => {};

export const VideoPokerCanvas = (props: VideoPokerCanvasProps) => {
  const { width = 500, height = 500, style } = props;
  const { cards, holds, ...pokerProps } = useVideoPoker({});

  useEffect(() => {
    console.log(cards, holds);
    console.log(pokerProps);
  }, [cards]);

  return (
    <Stage width={width} height={height} style={style}>
      <Layer>
        <BackgroundRect width={width} height={height} />
        <PayScheduleRect width={width} height={height / 2} />
      </Layer>
    </Stage>
  );
};
