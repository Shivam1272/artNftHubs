import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Style from "./Error.module.css";
import images from "../../img";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const Error = () => {
  const { error, setOpenError } = useContext(NFTMarketplaceContext);
  console.log(error);
  useEffect(() => {
    toast(error);
  }, [error, setOpenError]);
  return (
    <div className={Style.Error} onClick={() => setOpenError(false)}>
      <div className={Style.Error_box}>
        <div className={Style.Error_box_info}>
          {/* <Image
              src={images.user2}
              alt="Error"
              width={100}
              height={100}
              className={Style.Error_box_info_img}
            /> */}
          <h2>Oops!</h2>
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
  //   return (
  //     <div onClick={() => setOpenError(false)}>
  //       <ToastContainer
  //         position="top-right"
  //         autoClose={5000}
  //         hideProgressBar={false}
  //         newestOnTop={false}
  //         rtl={false}
  //         pauseOnFocusLoss
  //         draggable
  //         pauseOnHover
  //         theme="dark"
  //         // transition:Bounce
  //       />
  //     </div>
  //   );
};

export default Error;
