import React from "react";
import NavContainer from "./navigation/NavContainer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-black">
      <div className="hidden md:block sticky top-0 h-screen">
        <NavContainer />
      </div>
      <div className="grow mt-2 md:pt-4 px-4 md:px-8 bg-white dark:bg-gray-900 border border-transparent md:rounded-l-xl">
        <div className="flex flex-col w-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}
