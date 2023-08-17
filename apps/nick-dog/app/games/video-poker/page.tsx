'use client';
import React, { useEffect, useState } from 'react';
import { VideoPokerCanvas } from '../../../components/konva/video-poker';

export default function Home() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [margin] = useState(20);

  const [mode, setMode] = useState<'watch' | 'play' | 'odds'>('watch');

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

  return (
    <div style={{ display: 'grid', width: '100vw', height: '100vh' }}>
      <div style={{ position: 'absolute' }}>
        <button onClick={() => setMode('watch')}>Watch</button>
        <button onClick={() => setMode('watch')}>Play</button>
        <button onClick={() => setMode('watch')}>Explore Odds</button>
      </div>
      <VideoPokerCanvas
        width={width}
        height={height}
        style={{ margin: 'auto', borderRadius: 5, overflow: 'hidden' }}
        // bgColor={'blue'}
      />
    </div>
  );
}
