import { ContentCard, GradientTitleText } from '@biscuitnick/biscuit-ui';

const contentItems = [
  {
    title: 'Video Poker',
    href: '/games/video-poker',
    image: '/images/jacks-or-better.png',
  },
  // {
  //   title: 'Blackjack',
  //   href: '/games/video-poker',
  //   image: '/cards.jpg',
  // },
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
      <div className="content-card-grid">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-6 min-h-screen"> */}
        {contentItems.map((item, i) => (
          <ContentCard key={i} {...item} />
        ))}
        {/* </div> */}
      </div>
    </div>
  );
}
