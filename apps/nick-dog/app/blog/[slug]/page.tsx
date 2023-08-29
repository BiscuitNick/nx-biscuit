const STRAPI_API_PATH = process.env.STRAPI_API_PATH;

async function getData(slug: string) {
  const res = await fetch(
    `${STRAPI_API_PATH}/api/blogs?filters[slug][$eq]=${slug}`
    // {
    //   next: { revalidate: 10 },
    // }
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

  return <div>{JSON.stringify(data)}</div>;
}
