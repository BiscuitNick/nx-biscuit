'use client';
import React, { useEffect, useState, useRef } from 'react';
import { VideoPokerGame } from '../../../../components/konva/video-poker';
import { FaGamepad } from 'react-icons/fa'; //FaEye, FaGlobe
import { GradientTitleText } from '@biscuitnick/biscuit-ui';

export default function Home() {
  const gameRef = useRef<HTMLDivElement>(null);
  // const watchRef = useRef<HTMLDivElement>(null);
  // const exploreRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [mode, setMode] = useState<'play' | 'watch' | 'explore'>('play');

  const margin = 20;

  useEffect(() => {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const adjustedMargin = winWidth < 500 ? 0 : margin;
    const w = winWidth - adjustedMargin * 2;
    const h = winHeight - adjustedMargin * 2;
    const square = Math.min(w, h);
    setWidth(square);
    setHeight(square);
  }, []);

  // const goTo = (ref: string) => {
  //   const refs: any = { playRef, watchRef, exploreRef };
  //   const target = refs[ref];

  //   if (!target) return;
  //   target.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  const initializeGame = (gameMode: 'play' | 'watch' | 'explore') => {
    setMode(gameMode);
    gameRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="full-screen-wrapper">
        <div style={{ margin: 'auto', display: 'grid', gridGap: 10 }}>
          <div style={{ margin: 'auto' }}>
            <GradientTitleText text={'Video Poker'} />
          </div>

          <div style={{ margin: 'auto', display: 'grid', gridGap: 10 }}>
            <button onClick={() => initializeGame('play')}>
              <span
                style={{
                  display: 'grid',
                  gridTemplateColumns: '25px 100px',
                  gridGap: 10,
                }}
              >
                <FaGamepad style={{ margin: 'auto' }} />
                <span
                  style={{ margin: 'auto', width: '100%', textAlign: 'left' }}
                >
                  Play
                </span>
              </span>
            </button>
            {/* <button onClick={() => initializeGame('watch')}>
              <span
                style={{
                  display: 'grid',
                  gridTemplateColumns: '25px 100px',
                  gridGap: 10,
                }}
              >
                <FaEye style={{ margin: 'auto' }} />
                <span
                  style={{ margin: 'auto', width: '100%', textAlign: 'left' }}
                >
                  Watch
                </span>
              </span>
            </button>
            <button onClick={() => initializeGame('explore')}>
              {' '}
              <span
                style={{
                  display: 'grid',
                  gridTemplateColumns: '25px 100px',
                  gridGap: 10,
                }}
              >
                <FaGlobe style={{ margin: 'auto' }} />
                <span
                  style={{ margin: 'auto', width: '100%', textAlign: 'left' }}
                >
                  Explore
                </span>
              </span>
            </button> */}
          </div>
        </div>
      </div>

      <div className="full-screen-wrapper" ref={gameRef}>
        <VideoPokerGame
          mode={mode}
          width={width}
          height={height}
          style={{ margin: 'auto', borderRadius: 5, overflow: 'hidden' }}
        />
      </div>
      {/* <div className="full-screen-wrapper" ref={watchRef}>
        <VideoPokerGame
          mode={'watch'}
          width={width}
          height={height}
          style={{ margin: 'auto', borderRadius: 5, overflow: 'hidden' }}
        />
      </div>
      <div className="full-screen-wrapper" ref={exploreRef}>
        <VideoPokerGame
          mode={'explore'}
          width={width}
          height={height}
          style={{ margin: 'auto', borderRadius: 5, overflow: 'hidden' }}
        />
      </div> */}
    </>
  );
}

// {  // const [mode, setMode] = useState<'watch' | 'play' | 'odds'>('watch');
//   /* <div style={{ position: 'absolute' }}>
//   <button onClick={() => setMode('watch')}>Watch</button>
//   <button onClick={() => setMode('watch')}>Play</button>
//   <button onClick={() => setMode('watch')}>Explore Odds</button>
// </div> */
// }        // bgColor={'blue'}
