import getArtistInfoClient from '@lib/client/getArtistInfo';
import { LFMArtist } from '@types';
import Image from 'next/image';
import React from 'react';

interface Props {
  artist: LFMArtist
}

async function RandomArtistContent({ artist }: Props) {
  const response = await getArtistInfoClient(artist);

  const { artist: artistInfo } = response;

  return (
    <article className="randomArtistCard">
      <Image
        src={artistInfo.picture || 'https://via.assets.so/img.jpg?w=635&h=374&tc=blue&bg=#cecece'}
        alt={`Image of ${artistInfo.name}`}
        width={635}
        height={374}
      />
    </article>
  );
}

export default RandomArtistContent;
