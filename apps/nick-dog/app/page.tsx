import React from 'react';
import { HomePage } from '@nx-biscuit/biscuit-ui';

const navItems = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export default function Home() {
  return (
    <HomePage
      title={'NICK.DOG'}
      description={
        'My name is Nick. I design and build responsive, open-source, websites and applications.'
      }
      navItems={navItems}
    />
  );
}
