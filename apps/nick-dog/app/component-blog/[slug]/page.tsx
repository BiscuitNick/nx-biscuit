'use client';

import { VideoPoker } from '@nx-biscuit/biscuit-cards';

async function getData(slug: string) {
  const res = await fetch(
    `http://0.0.0.0:1337/api/component-posts?filters[slug][$eq]=${slug}`,
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const { data, meta } = await res.json();

  console.log(19, data, data.length);

  return { data, meta };
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { data } = await getData(slug);
  const { content } = data[0].attributes;

  return (
    <main className="text-white">
      {content.map((c: any) => {
        return c.type === 'text' ? (
          <div>{c.content}</div>
        ) : c.type === 'video-poker' ? (
          <VideoPoker initCards={[3, 4, 5, 6, 8]} />
        ) : null;
      })}
      <div>{content.length}</div>
    </main>
  );
}
