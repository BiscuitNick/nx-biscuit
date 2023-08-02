// import { DummyPoker } from '@nx-biscuit/biscuit-cards';

// const STRAPI_API_PATH = process.env.STRAPI_API_PATH;

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // false or "blocking"
  };
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  //   const res = await fetch(
  //     `${STRAPI_API_PATH}/api/component-posts?filters[slug][$eq]=${slug}`
  //   );

  //   const { data } = await res.json();
  //   const {
  //     attributes: { content },
  //   } = data[0];

  return {
    props: {
      content: [
        { type: 'text', content: 'hello there' },
        { type: 'video-poker' },
      ],
    },
  };
}

interface ContentItem {
  type: string;
  content?: string;
}

interface ContentArray {
  content: ContentItem[];
}

export default function Page({ content }: ContentArray) {
  return (
    <main className="text-white">
      {content?.map((c: ContentItem, i: number) => {
        return c.type === 'text' ? (
          <div key={i}>{c.content}</div>
        ) : c.type === 'video-poker' ? (
          //   <DummyPoker key={i} />
          <div> {JSON.stringify(c)}</div>
        ) : null;
      })}
    </main>
  );
}
