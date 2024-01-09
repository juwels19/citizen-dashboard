import React from "react";
import NavContainer from "./navigation/NavContainer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-6">
      <div className="basis-1/5 sticky top-0 py-3 px-3 h-screen">
        <NavContainer />
      </div>
      <div className="basis-4/5 py-3 px-3">
        <div className="flex flex-col w-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}
