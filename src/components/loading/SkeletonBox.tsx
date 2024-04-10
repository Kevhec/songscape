import React from 'react';

interface Props {
  width?: string
  height?: string
  radius?: string
}

export default function SkeletonBox({ width, height, radius }: Props) {
  return (
    <div
      className="skeleton"
      style={{
        '--element-width': width || 'auto',
        '--element-height': height || 'auto',
        '--radius': radius,
      } as React.CSSProperties}
    />
  );
}
