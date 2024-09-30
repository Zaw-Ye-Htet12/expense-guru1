import Header from "@/components/mobile/header";
import React from "react";
import Footer from "@/components/mobile/footer";

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default MobileLayout;
