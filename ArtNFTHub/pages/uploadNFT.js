import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/upload-nft.module.css";
import { UploadNFT } from "../UploadNFT/uploadNFTIndex";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const uploadNFT = () => {
  const { uploadFileToPinata, createNFT } = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.uploadNFT}>
      <div className={Style.uploadNFT_box}>
        <div className={Style.uploadNFT_box_heading}>
          <h1>Create New NFT</h1>
          <p>
            You can set preferred display name, create your profile URL and
            manage other personal settings.
          </p>
        </div>

        <div className={Style.uploadNFT_box_title}>
          <h2>Images</h2>
          <p>File types supported: JPG, PNG, JPGE</p>
        </div>

        <div className={Style.uploadNFT_box_form}>
          <UploadNFT
            uploadFileToPinata={uploadFileToPinata}
            createNFT={createNFT}
          />
        </div>
      </div>
    </div>
  );
};

export default uploadNFT;
