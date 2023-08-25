'use client';
import React, { useEffect, useState } from 'react';
import { BlackjackGame } from '../../../components/konva/blackjack';
export default function Home() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
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

  return (
    <div style={{ display: 'grid', width: '100vw', height: '100vh' }}>
      <BlackjackGame
        width={width}
        height={height}
        style={{ margin: 'auto', borderRadius: 5, overflow: 'hidden' }}
      />
    </div>
  );
}
