import React from 'react';

export default function AuthLayout({children}) {
  return (
    <div className='h-screen mx-auto flex items-center justify-center'>
      {children}
    </div>
  );
}
