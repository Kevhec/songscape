import React from 'react';
import Heading from '../Heading';
import Button from '../Button';
import Tag from '../tags/Tag';

export default async function TopTags() {
  return (
    <>
      <Heading variant="h2" icon="number-25">
        Top Tags
      </Heading>
      <div className="toptags__container">
        {
          Array.from({ length: 6 }).map((_, i) => (
            <Button href="#" key={Math.abs(i)}>
              <Tag variant="default">
                {`Example ${i ** 10}`}
              </Tag>
            </Button>
          ))
        }
      </div>
    </>
  );
}
