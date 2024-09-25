import React from "react";
import { MOBILE_FOOTER } from "@/constants/route";
import Link from "next/link";
import { getRelevantRoute } from "@/lib/route";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white border border-t border-gray-300">
      <div className="flex justify-around items-center gap-0">
        {MOBILE_FOOTER.map((item) => (
          <Link href={getRelevantRoute(item.route)} key={item.route}>
            <div
              className={`${
                item.name === "add" &&
                "rounded-full bg-[#2f7e79] w-[50px] h-[50px] flex items-center justify-center relative bottom-5"
              }`}
            >
              <Image
                className="w-[40px] h-[29px]"
                src={item.icon}
                alt={`${item.name} icon`}
              ></Image>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
