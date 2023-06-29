'use client';
import React from 'react';

import { BiscuitUi } from '@biscuitnick/biscuit-ui';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const BiscuitBoard: any = dynamic(
//   () => import('@biscuitnick/biscuit-konva').then((mod) => mod.BiscuitBoard),
//   { loading: () => <p>Loading...</p> }
// );

export default function Page() {
  return (
    <div>
      <BiscuitUi />
    </div>
  );
}
