'use client';

import React from 'react';
import Button from '../Button';
import Icon from '../icon';

export default function HistoryNav() {
  return (
    <div className="historyNav">
      <Button className="historyNav__button">
        <Icon variant="go-back" />
      </Button>
      <Button className="historyNav__button">
        <Icon variant="go-next" />
      </Button>
    </div>
  );
}
