import React from 'react';
import Image from 'next/image';
import icon25 from '@/public/25.svg';
import TopArtists from '@/components/sections/TopArtists';

export default async function Page() {
  return (
    <>
      <div className="home-heading">
        <Image src={icon25} alt="25" />
        <h1>Artists that made history</h1>
      </div>
      <TopArtists />
    </>
  );
}
