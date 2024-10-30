import Image from "next/image";
import { faker } from "@faker-js/faker";
import  Bg from "../../../public/person_avatar.png"
const Avatar = ({
  width = 120,
  height = 120,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <div style={{width:width,height:height}} className="rounded-full overflow-hidden flex justify-center">
      <Image
      src={Bg}
      alt="profile"
      width={width}
      height={height}
      className="object-cover"
    />
    </div>
  );
};

export default Avatar;
