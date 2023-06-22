import React from 'react';
import { HomePage } from '@nx-biscuit/biscuit-ui';

const navItems = [{ name: 'Projects', href: '/projects' }];

export default function Home() {
  return (
    <HomePage
      title={'NICK.DOG'}
      description={'blah blah'}
      navItems={navItems}
    />
  );
}
