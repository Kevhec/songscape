import type { Metadata } from 'next';
import React from 'react';
import { montserrat } from '@/styles/fonts';
import '@/scss/main.scss';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'SongScape',
  description: 'SongScape, your musical ally',
};

export default function RootLayout({
  children,
}: Props) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>{children}</body>
    </html>
  );
}
