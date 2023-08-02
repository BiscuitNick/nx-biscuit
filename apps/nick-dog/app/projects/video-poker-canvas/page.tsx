'use client';
import React, { useEffect, useState } from 'react';
// import { VideoPokerCanvas } from '@nx-biscuit/biscuit-cards';
import { VideoPokerCanvas } from '../../../components/konva/video-poker';

export default function Home() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [margin, setMargin] = useState(20);

  useEffect(() => {
    const w = window.innerWidth - margin * 2;
    const h = window.innerHeight - margin * 2;
    const square = Math.min(w, h);
    setWidth(square);
    setHeight(square);
  }, []);

  return (
    <div style={{ display: 'grid', width: '100vw', height: '100vh' }}>
      <VideoPokerCanvas
        width={width}
        height={height}
        style={{ margin: 'auto', borderRadius: 5, overflow: 'hidden' }}
        // bgColor={'blue'}
      />
    </div>
  );
}
