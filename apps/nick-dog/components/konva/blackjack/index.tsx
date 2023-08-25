import { BlackjackCanvas } from './blackjack-canvas';
import { Board } from '@biscuitnick/biscuit-konva'; //Buddy,
import { GameWrapper } from '@biscuitnick/biscuit-ui'; // GameOptions,
import { useRef } from 'react';

interface BlackjackGameProps {
  width?: number;
  height?: number;
  style?: any;
}

export const BlackjackGame = (props: BlackjackGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width = 500, height = 500, style } = props;
  return (
    <GameWrapper width={width} height={height}>
      <Board width={width} height={height} style={style} canvasRef={canvasRef}>
        <BlackjackCanvas width={width} height={height} />
      </Board>
    </GameWrapper>
  );
};
