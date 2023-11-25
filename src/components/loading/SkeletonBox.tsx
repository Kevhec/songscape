import React from 'react';

interface Props {
  width?: string
  height?: string
}

export default function SkeletonBox({ width, height }: Props) {
  return (
    <div
      className="skeleton"
      style={{
        '--element-width': width,
        '--element-height': height,
      } as React.CSSProperties}
    />
  );
}
