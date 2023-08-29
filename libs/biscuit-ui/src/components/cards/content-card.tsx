import Link from 'next/link';

interface ContentCardProps {
  title?: string;
  description?: string;
  image?: string;
  href?: string;
}

export const ContentCard = (props: ContentCardProps) => {
  const { title = 'title', image = '', href = 'href' } = props;

  return (
    <Link href={href}>
      <div className="content-card">
        <div
          className="content-card-image"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="content-card-title">{title}</div>
      </div>
    </Link>
  );
};
