import React from "react";

const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-dvh">
      <div className="w-full h-10 bg-white bg-opacity-50 flex flex-row justify-between items-center ">
        <div>Hello</div>
        <div>World</div>
      </div>
      <div className="flex h-[calc(100dvh-64px)]">
        <div className="w-[15%] h-dvh border-r border-secondary bg-[#488d88]"></div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DesktopLayout;
