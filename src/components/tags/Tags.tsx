import React from 'react';

import type { LFMTag } from '@types';
import Tag from './Tag';

interface Props {
  tags: LFMTag[]
}

export default function Tags({ tags }: Props) {
  return (
    <div className="tags">
      {
        tags.slice(undefined, 3).map((tag) => (
          <Tag key={tag.id} variant="dark">
            {tag.name}
          </Tag>
        ))
      }
    </div>
  );
}
