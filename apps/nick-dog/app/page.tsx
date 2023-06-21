import Link from 'next/link';
import React from 'react';
// import Particles from "./components/particles";

import { HomePage } from '@nx-biscuit/biscuit-ui';

const navigation = [{ name: 'Projects', href: '/projects' }];

export default function Home() {
  return (
    <HomePage
      title={'NICK.DOG'}
      description={'blah blah'}
      // navigation={navigation}
    />
  );
}
