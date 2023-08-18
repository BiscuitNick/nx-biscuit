import { useVideoPoker } from '@nx-biscuit/biscuit-cards';
import { Background } from './background-rect';
import { PaySchedule } from './pay-schedule';
import { PokerHand } from './poker-hand';
import { BottomButtonRow } from './bottom-button-row';
import { HandStatusBar } from './hand-status-bar';
import { BetCreditStatusBar } from './bet-credit-status-bar';
import { pokerCat, Buddy, Board } from '@biscuitnick/biscuit-konva';
import { useRef, useState, useEffect } from 'react';
import { ToggleSwitch } from '@biscuitnick/biscuit-ui';

interface VideoPokerCanvasProps {
  width?: number;
  height?: number;
  style?: any;
}

export const VideoPokerCanvas = (props: VideoPokerCanvasProps) => {
  const { width = 500, height = 500, style } = props;
  const {
    handStatusBar,
    betCreditStatusBar,
    paySchedule,
    pokerHand,
    bottomButtonRow,

    focalPoint,
    isTracking,

    toggleOptions,
    showOptions,

    toggleBuddy,
    showBuddy,

    toggleAutoPlay,
    autoPlay,
  } = useVideoPoker({
    width,
    height,
    payScheduleView: 'detailed-odds', //'odds-and-payouts',
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [buddyBox, setBuddyBox] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
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
        <PokerHand {...pokerHand} />
        <BetCreditStatusBar {...betCreditStatusBar} />
        <BottomButtonRow {...bottomButtonRow} />
        {showBuddy && (
          <Buddy
            box={buddyBox}
            contentObject={pokerCat}
            contentIDs={['image_2', 'eye_0', 'eye_1']}
            canvasRef={canvasRef}
            handleClick={() => console.log('')}
            handleDrag={handleBuddyDrag}
            focalPoint={focalPoint}
            isTracking={isTracking}
          />
        )}
      </Board>

      {showOptions && (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'grid',
          }}
        >
          <div
            style={{
              width,
              height,
              background: '#000000cc',
              margin: 'auto',
              display: 'grid',
              gridAutoRows: '50px',

              border: '1px solid white',
              // gridGap: 10,
              // gridAutoRows: 'minmax(100px, auto)',

              position: 'relative',
              padding: 10,
            }}
          >
            <button
              style={{
                position: 'absolute',
                right: 10,
                top: 10,
                width: 30,
                background: 'red',
                color: 'white',
              }}
              onClick={toggleOptions}
            >
              X
            </button>

            <div className="text-white">OPTIONS</div>
            <ToggleSwitch
              label={'Show Buddy'}
              checked={showBuddy}
              onChange={toggleBuddy}
            />
            <ToggleSwitch
              label={'Auto Play'}
              checked={autoPlay}
              onChange={toggleAutoPlay}
            />
          </div>
        </div>
      )}
    </>
  );
};
