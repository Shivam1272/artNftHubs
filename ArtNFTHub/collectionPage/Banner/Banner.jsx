import React from "react";
import Image from "next/image";
//INTERNAL IMPORT
import Style from "./Banner.module.css";

const Banner = ({ bannerImage }) => {
  return (
    <div className={Style.banner}>
      <div className={Style.banner_img}>
        <Image
          src={bannerImage}
          // style={{ objectFit: "cover" }}
          alt="background"
          width={1600}
          height={300}
          objectFit="cover"
        />
      </div>

      <div className={Style.banner_img_mobile}>
        <Image
          src={bannerImage}
          // style={{ objectFit: "cover" }}
          alt="background"
          width={1600}
          height={900}
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default Banner;
