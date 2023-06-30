import React from 'react';
import { HomePage } from '@biscuitnick/biscuit-ui';

const navItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export default function Home() {
  return (
    <HomePage
      title={'NICK.DOG'}
      description={['Web | Games | Apps', 'Design & Development']}
      navItems={navItems}
      gitHubUrl={'https://github.com/BiscuitNick/nx-biscuit'}
    />
  );
}
