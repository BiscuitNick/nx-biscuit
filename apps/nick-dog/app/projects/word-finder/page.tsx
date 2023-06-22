'use client';
import React from 'react';
// import { BjGame } from '@nx-biscuit/biscuit-cards';
// import BiscuitUi from '@nx-biscuit/biscuit-ui';
import { BiscuitWords } from '@biscuitnick/biscuit-words';

import { CoverPage } from '@nx-biscuit/biscuit-ui';

export default function Home() {
  return (
    <>
      <BiscuitWords />
      <CoverPage title={'WORD FINDER'} />
    </>
  );
}
