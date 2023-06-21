'use client';

import Link from 'next/link';
import React from 'react';
// import Particles from "./components/particles";

import { BjGame } from '@nx-biscuit/biscuit-cards';
import { HomePage } from '@nx-biscuit/biscuit-ui';

const navigation = [
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export default function Home() {
  return <BjGame decks={4} />;
}
