import React from 'react';
import TopArtists from '@components/sections/TopArtists';
import TopTracks from '@components/sections/TopTracks';
import TopTags from '@components/sections/TopTags';
import fetchChartDataClient from '@lib/client/fetchChartData';
import TopAlbums from '@components/sections/TopAlbums';
import Heading from '@/components/Heading';

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
          <Heading variant="h2" icon="flame" className="heading__container--padded">
            Musical Legends
          </Heading>
          <div className="home__musicalLegends home__musicalLegends--darkbg">
            <section className="home__section home__section--top-albums">
              <TopAlbums
                artistsList={artistsList}
                containerClass="home__topAlbums"
                hidePagination
              />
            </section>
            <section className="home__section home__section--top-tags">
              <TopTags />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
