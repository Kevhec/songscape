import React from 'react';
import Slider from '@/components/Slider';
import getChartClient from '@/lib/client/getChart';
import ArtistCard from '../cards/artist/ArtistCard';

export default async function TopArtists() {
  const artistsList = await getChartClient({ method: 'artists' });

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
