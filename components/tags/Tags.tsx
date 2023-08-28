import React from 'react';
import type { LFMTag } from '@/app/(app)/home/page';
import Tag from './Tag';

interface Props {
  tags: LFMTag[]
}

export default function Tags({ tags }: Props) {
  return (
    <div className="tags">
      {
        tags.slice(undefined, 3).map((tag) => (
          <Tag tag={tag.name} variant="dark" />
        ))
      }
    </div>
  );
}
