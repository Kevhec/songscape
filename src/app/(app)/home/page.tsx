import React from 'react';
import TopArtists from '@/components/sections/TopArtists';
import TopTracks from '@/components/sections/TopTracks';
import TopTags from '@/components/sections/TopTags';
import fetchChartDataClient from '@/app/_lib/client/fetchChartData';
import TopAlbums from '@/components/sections/TopAlbums';

export default async function Page() {
  const artistsList = await fetchChartDataClient({ type: 'artists' });

  return (
    <>
      <section className="home__section home__section--top-artists">
        <TopArtists artistsList={artistsList} />
      </section>
      <div className="home__columns">
        <section className="home__section home__section--top-tracks">
          <TopTracks />
        </section>
        <div className="home__container">
          <section className="home__section home__section--top-tags">
            <TopTags />
          </section>
          <section className="home__section home__section--top-albums">
            <TopAlbums artistsList={artistsList} />
          </section>
        </div>
      </div>
    </>
  );
}
