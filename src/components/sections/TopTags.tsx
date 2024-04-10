import React from 'react';
import fetchChartDataClient from '@lib/client/fetchChartData';
import Button from '../Button';
import Tag from '../tags/Tag';

export default async function TopTags() {
  const tagsList = await fetchChartDataClient({ type: 'tags' });

  return (
    <div className="toptags__container darkbg-section">
      {
          tagsList.map((tag) => (
            <Button href="#" key={tag.id}>
              <Tag variant="default">
                {tag.name}
              </Tag>
            </Button>
          ))
        }
    </div>
  );
}
