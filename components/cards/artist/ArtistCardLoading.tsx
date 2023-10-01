import React from 'react';
import Icon from '@/components/icon';
import SkeletonBox from '@/components/loading/SkeletonBox';

export default function ArtistCardLoading() {
  return (
    <div className="artist-card artist-card--loading">
      <div className="artist-card__link">
        <SkeletonBox width="170px" height="170px" />
        <div className="artist-card__name artist-card__name--loading flex align-center">
          <SkeletonBox width="100px" height="16px" />
        </div>
      </div>
      <div className="artist-card__body">
        <div className="artist-card__location artist-card__location--loading flex flex-row align-center">
          <Icon variant="location" fill="#212529" width={22} />
          <SkeletonBox width="100%" height="16px" />
        </div>
        <div className="tags">
          <SkeletonBox width="100px" height="16px" />
          <SkeletonBox width="50px" height="16px" />
          <SkeletonBox width="75px" height="16px" />
        </div>
      </div>
    </div>
  );
}
