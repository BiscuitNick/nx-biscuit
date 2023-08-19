import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <h1>Games</h1>
      <div>
        <Link href="/games/video-poker">Video Poker</Link>
      </div>
    </div>
  );
}
