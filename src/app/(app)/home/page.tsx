import React from 'react';
import TopArtists from '@/components/sections/TopArtists';
import TopTracks from '@/components/sections/TopTracks';
import TopTags from '@/components/sections/TopTags';

export default async function Page() {
  return (
    <>
      <section className="home__section home__section--top-artists">
        <TopArtists />
      </section>
      <div className="home__columns">
        <section className="home__section home__section--top-tracks">
          <TopTracks />
        </section>
        <section className="home__section home__section--top-tags">
          <TopTags />
        </section>
      </div>
    </>
  );
}
