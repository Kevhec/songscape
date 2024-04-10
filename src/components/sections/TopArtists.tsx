import React from 'react';
import Slider from '@components/Slider';
import type { LFMArtist } from '@lib/types';
import ArtistCard from '../cards/artist/ArtistCard';
import Heading from '../Heading';

interface Props {
  artistsList: LFMArtist[]
}

export default async function TopArtists({ artistsList }: Props) {
  return (
    <>
      <Heading variant="h1" icon="number-25" className="heading__container--padded">
        Artists that made history
      </Heading>
      <Slider
        sliderIdentifier="topartists"
        autoWidth
        gap={16}
        elements={
          artistsList.map((artist) => (
            <ArtistCard artist={artist} />
          ))
        }
        breakpoints={{
          375: {
            focus: 'center',
          },
        }}
        omitEnd
        perMove={1}
      />
    </>
  );
}
