import React, { useContext, useEffect, useState } from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  Subscribe,
  Title,
  Category,
  NFTCard,
  FollowerTab,
  Loader,
} from "../components/componentsindex";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import { getTopCreators } from "../topCreator/topCreators";
import { getMaxNFTCreators } from "../topCreator/maxNFTCreator";

const Home = () => {
  const { checkIfWalletConnected, currentAccount, fetchNFT } = useContext(
    NFTMarketplaceContext
  );

  useEffect(() => {
    checkIfWalletConnected();
  }, [currentAccount]);

  const [nfts, setNfts] = useState();
  const [nftsCopy, setNftsCopy] = useState([]);

  const topCreators = getTopCreators(nfts);
  const nftCreated = getMaxNFTCreators(nfts);

  useEffect(() => {
    fetchNFT().then((item) => {
      setNfts(item);
      setNftsCopy(item?.reverse());
    });
  }, []);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      {/* <BigNFTSilder /> */}
      {topCreators.length == 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreator={topCreators} NftCreated={nftCreated} />
      )}
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      {nfts?.length == 0 ? <Loader /> : <NFTCard NFTData={nfts} />}
      {/* <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      /> */}
      {/* <Category /> */}
      {/* <Subscribe /> */}
    </div>
  );
};

export default Home;
