import React from 'react';
import getArtistAlbumsClient from '@/app/_lib/client/getArtistAlbums';
import type { LFMArtist } from '@/app/_lib/types';
import Heading from '../Heading';
import AlbumCard from '../cards/AlbumCard';
import Slider from '../Slider';

interface Props {
  artistsList: LFMArtist[]
}

export default async function TopAlbums({ artistsList }: Props) {
  const threeFirstArtists = artistsList.slice(0, 3);
  const threeFristArtistsTopAlbums = await Promise.all(
    threeFirstArtists.map(async (artist) => (
      getArtistAlbumsClient(artist.name)
    )),
  );

  return (
    <>
      <Heading variant="h1" icon="number-25" className="heading__container--padded">
        Top Albums
      </Heading>
      <div className="home__topAlbums">
        <Slider
          sliderIdentifier="topalbums"
          elements={
            threeFristArtistsTopAlbums.map((album) => {
              if (typeof album !== 'boolean') {
                return (
                  <AlbumCard
                    key={album.id}
                    album={album?.topalbums?.album?.[0]}
                  />
                );
              }

              return null;
            })
          }
        />
      </div>
    </>
  );
}
