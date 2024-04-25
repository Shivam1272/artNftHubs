import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "../components/componentsindex";
import Image from "next/image";
import Style from "../styles/reSellToken.module.css";
import fromStyle from "../AccountPage/Form/Form.module.css";

import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const reSellToken = () => {
  const { createSale } = useContext(NFTMarketplaceContext);
  const router = useRouter();
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const { id, tokenURI } = router.query;

  const fetchNFT = async () => {
    if (!tokenURI) return;
    const { data } = await axios.get(tokenURI);
    console.log("resell ", data);
    // setPrice(data.price);
    setImage(data.image);
  };
  useEffect(() => {
    fetchNFT();
  }, [id]);

  const resell = async () => {
    try {
      console.log(price);
      await createSale(tokenURI, price, true, id);
    } catch (error) {
      console.log("Error while  reselling: ", error);
    }
  };
  return (
    <div className={Style.reSellToken}>
      <div className={Style.reSellToken_box}>
        <h1>ReSell Your Token, Set Price</h1>
        <div className={fromStyle.Form_box_input}>
          <label htmlFor="name">Price</label>
          <input
            type="number"
            min={0.1}
            placeholder="reSell Price"
            className={fromStyle.Form_box_input_userName}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className={Style.reSellToken_box_img}>
          {image && (
            <Image src={image} alt="resell nft" height={400} width={400} />
          )}
        </div>
        <div className={Style.reSellToken_box_btn}>
          <Button btnName="Resell NFT" handleClick={resell} />
        </div>
      </div>
    </div>
  );
};

export default reSellToken;
