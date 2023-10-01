import React, { Suspense, memo } from 'react';
import type { LFMArtist } from '@/types';
import ArtistCardContent from './ArtistCardContent';
import ArtistCardLoading from './ArtistCardLoading';

interface Props {
  artist: LFMArtist
}

const ArtistCard = memo(({ artist }: Props) => (
  <Suspense fallback={<ArtistCardLoading />}>
    <ArtistCardContent artist={artist} />
  </Suspense>
));

export default ArtistCard;
