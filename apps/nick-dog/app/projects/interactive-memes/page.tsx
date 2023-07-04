'use client';
import React from 'react';
import BiscuitTest from '/content/biscuit-test.mdx';

// import dynamic from 'next/dynamic';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const BiscuitBoard: any = dynamic(
//   () => import('@biscuitnick/biscuit-konva').then((mod) => mod.BiscuitBoard),
//   { loading: () => <p>Loading...</p> }
// );
// import { BiscuitBoard, executiveCat } from '@biscuitnick/biscuit-konva';

export default function Page() {
  return (
    <div className="p-10 flex flex-col justify-center w-screen min-h-screen text-white">
      <BiscuitTest />
    </div>
  );
}
