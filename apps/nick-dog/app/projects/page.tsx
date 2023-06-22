// import Link from 'next/link';
// import React from 'react';

// const projects = [
//   {
//     name: 'BlackJack',
//     href: '/projects/blackjack',
//     description: 'A simple blackjack game',
//     github: '',
//   },
// ];

// export default function ProjectsIndex() {
//   return (

//   );
// }

import React from 'react';
import { HomePage } from '@nx-biscuit/biscuit-ui';

const navItems = [{ name: 'Projects', href: '/projects' }];

export default function Home() {
  return (
    <HomePage
      title={'PROJECTS'}
      description={'blah blah'}
      navItems={navItems}
    />
  );
}
