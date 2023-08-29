import { useVideoPoker } from '@nx-biscuit/biscuit-cards';
import { Buddy, Board } from '@biscuitnick/biscuit-konva';
import { useRef } from 'react';
import { VideoPokerCanvas } from './video-poker-canvas';
import { GameOptions, GameWrapper } from '@biscuitnick/biscuit-ui';

interface VideoPokerGameProps {
  width?: number;
  height?: number;
  style?: any;
  mode?: 'play' | 'watch' | 'explore';
}

export const VideoPokerGame = (props: VideoPokerGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width = 500, height = 500, style } = props;
  const { buddyProps, optionProps, colors, setColors, ...videoPokerProps } =
    useVideoPoker({
      width,
      height,
      payScheduleView: 'detailed-odds', //'odds-and-payouts',
      mode: props.mode || 'play',
    });

  return (
    <GameWrapper width={width} height={height}>
      <Board width={width} height={height} style={style} canvasRef={canvasRef}>
        <VideoPokerCanvas
          width={width}
          height={height}
          {...videoPokerProps}
          colors={colors}
        />
        <Buddy {...buddyProps} canvasRef={canvasRef} />
      </Board>
      <GameOptions {...optionProps} colors={colors} setColors={setColors} />
    </GameWrapper>
  );
};
