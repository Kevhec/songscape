import React, { Suspense, memo } from 'react';
import type { LFMArtist } from '@/types';
import ArtistCardContent from './ArtistCardContent';

interface Props {
  artist: LFMArtist
}

const ArtistCard = memo(({ artist }: Props) => (
  <Suspense fallback="Loading...">
    <ArtistCardContent artist={artist} />
  </Suspense>
));

export default ArtistCard;
