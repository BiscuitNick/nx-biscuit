'use client';

import { MathJaxContext } from 'better-react-mathjax';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('markdown/layout.tsx');
  return (
    <MathJaxContext>
      <div style={{ pointerEvents: 'none' }}>{children}</div>
    </MathJaxContext>
  );
}
