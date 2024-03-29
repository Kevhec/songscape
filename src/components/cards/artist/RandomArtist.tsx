import React, { memo, Suspense } from 'react';
import type { LFMArtist } from '@types';
import RandomArtistLoading from './RandomArtistLoading';
import RandomArtistContent from './RandomArtistContent';

interface Props {
  artist: LFMArtist
}

const RandomArtistCard = memo(({ artist }: Props) => (
  <Suspense fallback={<RandomArtistLoading />}>
    <RandomArtistContent artist={artist} />
  </Suspense>
));

export default RandomArtistCard;
