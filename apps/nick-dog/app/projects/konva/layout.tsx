import { Inter } from '@next/font/google'; //Inter, Roboto,
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

// import '../styles/global.css';

export const metadata: Metadata = {
  title: {
    default: 'nick.dog',
    template: '%s | nick.dog',
  },
  description: 'Software engineer, AI enthusiast, and founder of BiscuitLand',
  openGraph: {
    title: 'nick.dog',
    description: 'Software engineer, AI enthusiast, and founder of BiscuitLand',
    url: 'https://nick.dog',
    siteName: 'nick.dog',
    // images: [
    //   {
    //     url: "",
    //     width: 1920,
    //     height: 1080,
    //   },
    // ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'NickDog',
    card: 'summary_large_image',
  },
  // icons: {
  //   shortcut: "/favicon.png",
  // },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${inter.className}`}
        style={{ margin: 0, padding: 0 }}
      >
        {children}
      </body>
    </html>
  );
}
