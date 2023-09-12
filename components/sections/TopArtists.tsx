import React from 'react';
import Slider from '@/components/Slider';
import getArtistChartClient from '@/app/_lib/client/getArtistsChart';
import ArtistCard from '../cards/artist/ArtistCard';

export default async function TopArtists() {
  const artistsList = await getArtistChartClient();

  return (
    <Slider
      elements={
        artistsList.map((artist) => (
          <ArtistCard artist={artist} />
        ))
      }
    />
  );
}
