'use client';

import React from 'react';
import VideoPokerBlog from '/content/video-poker.mdx';

export default function Home() {
  return (
    <div className="p-10 flex flex-col justify-center w-screen min-h-screen text-white">
      <VideoPokerBlog />
    </div>
  );
}
