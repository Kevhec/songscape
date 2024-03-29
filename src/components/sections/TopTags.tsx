import React from 'react';
import fetchChartDataClient from '@lib/client/fetchChartData';
import Heading from '../Heading';
import Button from '../Button';
import Tag from '../tags/Tag';

export default async function TopTags() {
  const tagsList = await fetchChartDataClient({ type: 'tags' });

  return (
    <>
      <Heading variant="h2" icon="number-25">
        Top Tags
      </Heading>
      <div className="toptags__container">
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
    </>
  );
}
