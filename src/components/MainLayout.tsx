import React from 'react';
import NavContainer from './navigation/NavContainer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row min-h-full gap-6">
      <div className="flex flex-col">
        <NavContainer />
      </div>
      <div className="flex flex-col w-full px-8">{children}</div>
    </div>
  );
}
