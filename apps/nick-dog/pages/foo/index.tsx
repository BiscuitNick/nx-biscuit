import type { GetStaticProps } from 'next';
import Link from 'next/link';
const STRAPI_API_PATH = process.env.STRAPI_API_PATH;

export const getStaticProps: GetStaticProps<{
  slugs: string[];
}> = async () => {
  const res = await fetch(`${STRAPI_API_PATH}/api/component-posts`);
  const { data } = await res.json();
  const slugs = data.map(
    (d: { attributes: { slug: string } }) => d.attributes.slug
  );
  return { props: { slugs } };
};

export default function Page({ slugs }: { slugs: string[] }) {
  const TitleLinks = slugs.map((slug: string) => (
    <div key={slug}>
      <Link href={`/component-blog/${slug}`}>{slug}</Link>
    </div>
  ));
  return <main className="text-white">{TitleLinks}</main>;
}
