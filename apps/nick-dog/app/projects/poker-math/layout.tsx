'use client';

import { MathJaxContext } from 'better-react-mathjax';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MathJaxContext>
      <div style={{ pointerEvents: 'none' }}>{children}</div>
    </MathJaxContext>
  );
}
