import React from 'react';
import { HomePage } from '@nx-biscuit/biscuit-ui';

const navItems = [
  // { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  // { name: 'Contact', href: '/contact' },
];

export default function Home() {
  return (
    <HomePage
      title={'NICK.DOG'}
      description={'Full-stack application design and development'}
      navItems={navItems}
    />
  );
}
