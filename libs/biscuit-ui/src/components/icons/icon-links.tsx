'use client';

import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';

interface IconLinkProps {
  href: string;
  style?: React.CSSProperties;
}

export const GitHubLink = ({ href, style }: IconLinkProps) => {
  return (
    <Link href={href}>
      <GitHubIcon style={style} />
    </Link>
  );
};
