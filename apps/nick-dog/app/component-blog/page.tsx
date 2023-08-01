/* eslint-disable react/jsx-key */
import Link from 'next/link';
const STRAPI_API_PATH = process.env.STRAPI_API_PATH;

async function getData() {
  const res = await fetch(`${STRAPI_API_PATH}/api/component-posts`, {
    next: { revalidate: 10 },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  //   console.log(res);

  //   return 'helllo';

  // Recommendation: handle errors
  if (!res.ok) {
    console.log(12, 'error');
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page() {
  const { data } = await getData();
  const TitleLinks = data.map(
    (d: { attributes: { title: string; slug: string } }) => (
      <div>
        <Link href={`/component-blog/${d.attributes.slug}`}>
          {' '}
          {d.attributes.title}
        </Link>
      </div>
    )
  );
  return <main className="text-white">{TitleLinks}</main>;
}
