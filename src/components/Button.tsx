import React from 'react';
import cn from 'classnames';

interface Props {
  href?: string
  className?: string
  children: React.ReactNode
}

export default function Button({ href, className, children }: Props) {
  const classes = cn(className);
  return (
    href ? (
      <a href={href} className={`button button--link ${classes}`}>
        {children}
      </a>
    ) : (
      <button type="button" className={`button button--normal ${classes}`}>
        {children}
      </button>
    )
  );
}
