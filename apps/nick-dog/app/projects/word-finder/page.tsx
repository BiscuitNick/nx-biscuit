'use client';
import React from 'react';
import { Finder } from '@biscuitnick/biscuit-words';
import { CoverPage } from '@nx-biscuit/biscuit-ui';

export default function Home() {
  return (
    <>
      <Finder wordLength={5} />
      <CoverPage title={'WORD FINDER'} />
    </>
  );
}
