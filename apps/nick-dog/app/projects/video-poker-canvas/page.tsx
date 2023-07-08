'use client';
import React, { useEffect, useState } from 'react';
import { VideoPokerCanvas } from '@nx-biscuit/biscuit-cards';

export default function Home() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const square = Math.min(w, h);
    setWidth(square);
    setHeight(square);
  }, []);

  return (
    <div style={{ display: 'grid' }}>
      <VideoPokerCanvas
        width={width}
        height={height}
        style={{ margin: 'auto' }}
        bgColor={'blue'}
      />
    </div>
  );
}
