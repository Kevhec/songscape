import React from 'react';

interface Props {
  href?: string
  children: React.ReactNode
}

export default function Button({ href, children }: Props) {
  return (
    href ? (
      <a href={href} className="button button--link">
        {children}
      </a>
    ) : (
      <button type="button" className="button button--normal">
        {children}
      </button>
    )
  );
}
