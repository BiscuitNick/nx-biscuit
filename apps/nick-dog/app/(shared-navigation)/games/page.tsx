// import React from 'react';
// import { ProjectPage } from '@biscuitnick/biscuit-ui';
import { ContentCard, GradientTitleText } from '@biscuitnick/biscuit-ui';

const navItems = [
  // { name: 'BlackJack', href: '/projects/blackjack' },
  { name: 'Video Poker', href: '/games/video-poker' },
  // { name: 'Interactive Memes', href: '/projects/interactive-memes' },
  // { name: 'Word Finder', href: '/projects/word-finder' },
  // { name: 'xOrdle', href: '/projects/word-finder' },
];

const contentItems = [
  // { name: 'BlackJack', href: '/projects/blackjack' },
  {
    title: 'Video Poker',
    href: '/games/video-poker',
    image: '/images/jacks-or-better.png',
  },
  // {
  //   title: 'Video Poker',
  //   href: '/games/video-poker',
  //   image: '/images/jacks-or-better.png',
  // },

  // {
  //   title: 'Video Poker',
  //   href: '/games/video-poker',
  //   image: '/images/jacks-or-better.png',
  // },
  // { name: 'Interactive Memes', href: '/projects/interactive-memes' },
  // { name: 'Word Finder', href: '/projects/word-finder' },
  // { name: 'xOrdle', href: '/projects/word-finder' },
];

export default function Home() {
  // return <ProjectPage title={'Games'} description={''} navItems={navItems} />;
  return (
    <div
      className="full-screen-wrapper"
      style={{ gridTemplateRows: 'auto 1fr' }}
    >
      <div style={{ margin: 'auto', padding: 25 }}>
        <GradientTitleText text={'Games'} />
      </div>
      <div style={{ margin: 'auto' }}>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-6 min-h-screen"> */}
        {contentItems.map((item, i) => (
          <ContentCard key={i} {...item} />
        ))}
        {/* </div> */}
      </div>
    </div>
  );
}
