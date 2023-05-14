import React from 'react';

export default function Badge({className, text}) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${className}`}>
      {text}
    </span>
  );
}
