import React from 'react';
import TopArtists from '@/components/sections/TopArtists';
import TopTracks from '@/components/sections/TopTracks';

export default async function Page() {
  return (
    <>
      <TopArtists />
      <TopTracks />
    </>
  );
}
