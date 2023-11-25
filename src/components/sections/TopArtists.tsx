import React from 'react';
import Slider from '@/components/Slider';
import fetchChartDataClient from '@/app/_lib/client/fetchChartData';
import ArtistCard from '../cards/artist/ArtistCard';
import Heading from '../Heading';

export default async function TopArtists() {
  const artistsList = await fetchChartDataClient({ type: 'artists' });

  return (
    <div className="home__section home__section--top-artists">
      <Heading variant="h1" icon="number-25" className="heading__container--padded">
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
