import React from 'react';
import Slider from '@/components/Slider';
import getChartClient from '@/lib/client/getChart';
import ArtistCard from '../cards/artist/ArtistCard';
import Heading from '../Heading';

export default async function TopArtists() {
  const artistsList = await getChartClient({ method: 'artists' });

  return (
    <div className="top-artists">
      <Heading variant="h1" icon="number-25">
        Artists that made history
      </Heading>
      <Slider
        elements={
          artistsList.map((artist) => (
            <ArtistCard artist={artist} />
          ))
        }
      />
    </div>
  );
}
