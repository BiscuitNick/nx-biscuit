'use client';
import React from 'react';
import { BjGame } from '@nx-biscuit/biscuit-cards';
import { CoverPage } from '@nx-biscuit/biscuit-ui';

export default function Home() {
  return (
    <>
      <BjGame decks={4} />
      <CoverPage title={'BLACKJACK'} />
    </>
  );
}
