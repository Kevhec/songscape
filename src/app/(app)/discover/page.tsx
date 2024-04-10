import RandomArtist from '@/components/sections/discover/RandomArtist';
import TopAlbums from '@/components/sections/TopAlbums';
import getRandomArtistsListClient from '@lib/client/getRandomArtistsList';
import React from 'react';

export default async function Page() {
  const artistsList = await getRandomArtistsListClient();

  return (
    <section className="discover__container">
      <RandomArtist artistsList={artistsList} />
      <div className="discover__topAlbums">
        <h2>Featured Albums</h2>
        <TopAlbums
          containerClass="discover__topAlbums-slider"
          artistsList={artistsList.artists.artist}
          albumsPerArtist={4}
          hidePagination
          textOverImage
        />
      </div>
    </section>
  );
}
