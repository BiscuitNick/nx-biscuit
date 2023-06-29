import React from 'react';
import { ProjectPage } from '@biscuitnick/biscuit-ui';

const navItems = [
  { name: 'BlackJack', href: '/projects/blackjack' },
  { name: 'Interactive Memes', href: '/projects/interactive-memes' },
  { name: 'Word Finder', href: '/projects/word-finder' },
  // { name: 'xOrdle', href: '/projects/word-finder' },
];

export default function Home() {
  return (
    <ProjectPage title={'PROJECTS'} description={''} navItems={navItems} />
  );
}
