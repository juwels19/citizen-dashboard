import React from "react";
import NavContainer from "./navigation/NavContainer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-black">
      <div className="sticky top-0 h-screen">
        <NavContainer />
      </div>
      <div className="grow my-3 py-3 px-3 bg-white dark:bg-gray-900 border border-transparent rounded-tl-xl">
        <div className="flex flex-col w-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}
