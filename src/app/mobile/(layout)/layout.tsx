import Header from "@/components/mobile/header";
import React from "react";
import Footer from "@/components/mobile/footer";

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header></Header>
      <div>{children}</div>
      <Footer></Footer>
    </>
  );
};

export default MobileLayout;
