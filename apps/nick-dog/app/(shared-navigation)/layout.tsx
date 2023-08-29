// import { DarkModeButton } from '../../components/dark-mode-button';

import { DarkModeButton } from '@biscuitnick/biscuit-ui';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DarkModeButton />
      {children}
    </>
  );
}
