import React from 'react';
import Icon from '@/components/icon';
import SkeletonBox from '@/components/loading/SkeletonBox';

export default function ArtistCardLoading() {
  return (
    <div className="artist-card artist-card--loading">
      <SkeletonBox width="170px" height="170px" />
      <div className="artist-card__name artist-card__name--loading">
        <SkeletonBox width="100%" height="100%" />
      </div>
      <div className="artist-card__body artist-card__body--loading">
        <div className="artist-card__location artist-card__location--loading">
          <Icon variant="location" fill="#212529" width={22} />
          <p className="artist-card__location-text artist-card__location-text--loading">Location</p>
        </div>
        <div>Tags</div>
      </div>
    </div>
  );
}
