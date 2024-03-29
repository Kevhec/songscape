import RandomArtistCard from '@/components/cards/artist/RandomArtist';
import Slider from '@/components/Slider';
import getRandomArtistsListClient from '@lib/client/getRandomArtistsList';
import React from 'react';

export default async function Page() {
  const artistsList = await getRandomArtistsListClient();

  return (
    <div className="discover__randomArtists">
      <Slider
        sliderIdentifier="discoverartist"
        elements={
            artistsList.artists.artist.map((artist) => (
              <RandomArtistCard artist={artist} />
            ))
          }
        leftControlIcon={{
          variant: 'discover-slider-left-control',
        }}
        rightControlIcon={{
          variant: 'discover-slider-right-control',
        }}
        overrideParams={{
          slidesPerView: 1,
          effect: 'fade',
          fadeEffect: {
            crossFade: true,
          },
          loop: true,
          cssMode: false,
        }}
      />
    </div>
  );
}
