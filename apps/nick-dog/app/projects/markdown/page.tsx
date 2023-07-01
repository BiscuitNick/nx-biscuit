import React from 'react';
import HelloMDX from '../../../README.mdx';
export default function Home() {
  return (
    <div className="p-10 flex flex-col items-center justify-center w-screen h-screen text-white">
      <HelloMDX />
    </div>
  );
}
