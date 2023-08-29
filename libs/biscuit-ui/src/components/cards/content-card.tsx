import Link from 'next/link';

interface ContentCardProps {
  title?: string;
  description?: string;
  image?: string;
  href?: string;

  // type
  // style
  //
}

export const ContentCard = (props: ContentCardProps) => {
  const {
    title = 'title',
    description = 'description',
    image = '',
    href = 'href',
  } = props;
  return (
    <Link href={href}>
      <div className="content-card">
        <img
          src={image}
          alt={title}
          style={{
            margin: 'auto',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            borderRadius: 10,
          }}
        />
        <div>{title}</div>
      </div>
    </Link>
  );
};
