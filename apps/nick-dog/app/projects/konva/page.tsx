'use client';
import React from 'react';
import dynamic from 'next/dynamic';

// const Canvas = dynamic(() => import('../../../components/canvas'), {
//   ssr: false,
// });

const BiscuitCanvas = dynamic(() =>
  import('@biscuitnick/biscuit-konva').then((mod: any) => mod.BiscuitCanvas)
);

// import { BiscuitCanvas } from '@biscuitnick/biscuit-konva';

export default function Page() {
  return <BiscuitCanvas />;
}
