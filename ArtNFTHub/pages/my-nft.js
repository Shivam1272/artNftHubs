import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/author.module.css";
import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
import { Brand, Title } from "../components/componentsindex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../img";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../authorPage/componentIndex";

import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const author = () => {
  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);

  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(
    NFTMarketplaceContext
  );
  const [nfts, setNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);

  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetechItemListed").then((item) => {
      console.log("created", item);
      setNfts(item);
    });
  }, []);

  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetechMyNFTs").then((item) => {
      console.log("owned", item);
      setMyNFTs(item);
    });
  }, []);
  // console.log("owned1", myNFTs);
  // console.log("Listed1", nfts);
  return (
    <div className={Style.author}>
      <Banner bannerImage={images.creatorbackground2} />
      {/* <AuthorProfileCard /> */}
      <AuthorTaps setCollectiables={setCollectiables} setCreated={setCreated} />

      <AuthorNFTCardBox
        collectiables={collectiables}
        created={created}
        nfts={nfts}
        myNFTs={myNFTs}
      />
    </div>
  );
};

export default author;
