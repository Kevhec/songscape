import React from 'react';
import SkeletonBox from '@components/loading/SkeletonBox';

export default function RandomArtistLoading() {
  return (
    <article className="randomArtistCard randomArtistCard--loading">
      <SkeletonBox width="635px" height="374px" />
    </article>
  );
}
