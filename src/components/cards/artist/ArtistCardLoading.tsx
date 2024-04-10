import React from 'react';
import SkeletonBox from '@components/loading/SkeletonBox';

export default function ArtistCardLoading() {
  return (
    <article className="artist-card">
      <header className="artist-card__header">
        <SkeletonBox width="170px" height="170px" radius="8px" />
      </header>
      <main className="artist-card__body">
        <SkeletonBox width="100%" height="1rem" radius="5555px" />
      </main>
    </article>
  );
}
