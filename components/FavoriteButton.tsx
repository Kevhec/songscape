'use client';

import React, { useState } from 'react';
import cn from 'classnames';
import Icon from './icon';

export default function FavoriteButton() {
  const [isLiked, setIsLiked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
    setIsClicked(true);
  };

  const handleAnimationEnd = () => {
    setIsClicked(false);
  };

  return (
    <button
      type="button"
      className={cn(
        'favorite-button',
        {
          'favorite-button--liked': isLiked,
        },
      )}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
    >
      <Icon
        variant="empty-heart"
        width={18}
        stroke="#ecf39e"
        className={cn(
          ['favorite-button__icon'],
          {
            'favorite-button__icon--liked': isLiked,
            'favorite-button__icon--clicked': isClicked,
          },
        )}
      />
    </button>
  );
}
