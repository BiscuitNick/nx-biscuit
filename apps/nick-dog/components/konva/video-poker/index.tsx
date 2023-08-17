import { useVideoPoker } from '@nx-biscuit/biscuit-cards';
import { Stage, Layer } from 'react-konva';
import { Background } from './background-rect';
import { PaySchedule } from './pay-schedule';
import { PokerHand } from './poker-hand';
import { BottomButtonRow } from './bottom-button-row';
import { HandStatusBar } from './hand-status-bar';
import { BetCreditStatusBar } from './bet-credit-status-bar';
// import { useVideoPokerDimensions } from './use-video-poker-dimensions';
import {
  // BiscuitBoard,
  pokerCat,
  // executiveDog,
  Buddy,
  Board,
} from '@biscuitnick/biscuit-konva';
import { useRef, useState, useEffect } from 'react';
interface VideoPokerCanvasProps {
  width?: number;
  height?: number;
  style?: any;
}

export const VideoPokerCanvas = (props: VideoPokerCanvasProps) => {
  const { width = 500, height = 500, style } = props;
  const { handTitles, ...pokerProps } = useVideoPoker({ width, height });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    cards,
    holds,
    status,

    optimalHolds,
    minusBet,
    betOne,
    betMax,
    dealOrDraw,
    updateHolds,

    handStatusBar,
    betCreditStatusBar,
    paySchedule,

    focalPoint,
    isTracking,
  } = pokerProps;

  const [buddyBox, setBuddyBox] = useState({
    width: width / 3,
    height: height / 3,
    x: width / 2 - width / 6,
    y: height / 10,
  });

  useEffect(() => {
    setBuddyBox({
      width: Math.round(width / 3),
      height: Math.round(height / 3),
      x: Math.round(width / 2 - width / 6),
      y: Math.round(height / 10),
    });
  }, [width, height]);

  const handleBuddyDrag = (e: { target: any; type: any }) => {
    const { target, type } = e;
    const { x, y } = target.attrs;

    if (type === 'dragend') {
      setBuddyBox({
        ...buddyBox,
        x: Math.round(x),
        y: Math.round(y),
      });
    }
  };

  return (
    <>
      <Board width={width} height={height} style={style} canvasRef={canvasRef}>
        <Background width={width} height={height} color={'blue'} />
        <PaySchedule {...paySchedule} />
        <HandStatusBar {...handStatusBar} />
        <PokerHand
          y={height * 0.5}
          width={width}
          cards={cards}
          holds={holds}
          optimalHolds={optimalHolds}
          updateHolds={updateHolds}
          status={status}
        />
        <BetCreditStatusBar {...betCreditStatusBar} />
        <BottomButtonRow
          y={Math.round(height * 0.93)}
          width={width}
          status={status}
          minusBet={minusBet}
          betOne={betOne}
          betMax={betMax}
          dealOrDraw={dealOrDraw}
        />
        <Buddy
          box={buddyBox}
          contentObject={pokerCat}
          contentIDs={['image_2', 'eye_0', 'eye_1']}
          focalPoint={focalPoint}
          canvasRef={canvasRef}
          handleClick={() => console.log('')}
          handleDrag={handleBuddyDrag}
          isTracking={isTracking}
        />
      </Board>
    </>
  );
};
