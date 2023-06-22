import React from 'react';
import { ProjectPage } from '@nx-biscuit/biscuit-ui';

const navItems = [
  { name: 'BlackJack', href: '/projects/blackjack' },
  { name: 'Word Finder', href: '/projects/word-finder' },
  { name: 'xOrdle', href: '/projects/word-finder' },
];

export default function Home() {
  return (
    <ProjectPage
      title={'PROJECTS'}
      description={'blah blah'}
      navItems={navItems}
    />
  );
}
