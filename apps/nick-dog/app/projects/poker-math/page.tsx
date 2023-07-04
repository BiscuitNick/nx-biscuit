'use client';

import React from 'react';
// import HelloMDX from '../../../README.mdx';
import PokerMath from '/content/poker-math.mdx';

// import PokerMath from '/blog-content/poker-math.mdx';

export default function Home() {
  return (
    <div className="p-10 flex flex-col justify-center w-screen min-h-screen text-white">
      <PokerMath />
    </div>
  );
}
