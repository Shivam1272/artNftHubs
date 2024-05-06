import React from "react";
import { useRouter } from "next/router";
//INTERNAL IMPORT
import Style from "./AuthorNFTCardBox.module.css";
import { NFTCardTwo } from "../../collectionPage/collectionIndex";
import { Button } from "../../components/componentsindex";

const AuthorNFTCardBox = ({ collectiables, created, nfts, myNFTs }) => {
  const router = useRouter(); // Using the useRouter hook to get the router object

  // Function to handle redirection to uploadNFT page
  const redirectToUpload = () => {
    router.push("/uploadNFT");
  };

  // Function to handle redirection to buy page
  const redirectToBuy = () => {
    router.push("/searchPage"); // Modify as needed to match the correct route
  };

  return (
    <div className={Style.AuthorNFTCardBox}>
      {collectiables &&
        (nfts.length > 0 ? (
          <NFTCardTwo NFTData={nfts} />
        ) : (
          <div>
            <h3>No NFT Listed..</h3>
            <Button
              btnName="Create NFT"
              handleClick={redirectToUpload}
              classStyle={Style.upload_box_btn_style}
            />
          </div>
        ))}

      {created &&
        (myNFTs.length > 0 ? (
          <NFTCardTwo NFTData={myNFTs} />
        ) : (
          <div>
            <h3>You Don't Own any NFT</h3>
            <Button
              btnName="Buy NFT"
              handleClick={redirectToBuy}
              classStyle={Style.upload_box_btn_style}
            />
          </div>
        ))}
    </div>
  );
};

export default AuthorNFTCardBox;
