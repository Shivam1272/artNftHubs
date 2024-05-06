import React, { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./Upload.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "../components/componentsindex.js";
import { DropZone } from "./uploadNFTIndex.js";

const UloadNFT = ({ uploadFileToPinata, createNFT }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();

  return (
    <div className={Style.upload}>
      <DropZone
        title="JPG, PNG, WEBM , MAX 100MB"
        heading="Drag & drop file"
        subHeading="or Browse media on your device"
        name={name}
        description={description}
        price={price}
        setImage={setImage}
        uploadFileToPinata={uploadFileToPinata}
        className={Style.dropzone}
      />

      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="nft">Name</label>
          <input
            type="text"
            placeholder="Shivam"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="description">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="6"
            placeholder="something about yourself in few words"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p>
            The description will be included on the item's detail page
            underneath its image.
          </p>
        </div>

        <div className={formStyle.Form_box_input_social}>
          <div className={formStyle.Form_box_input}>
            <label htmlFor="Price">Price</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <FaEthereum />
              </div>
              <input
                type="text"
                placeholder="10 ETH"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={Style.upload_box_btn}>
          <Button
            btnName="Upload"
            handleClick={async () =>
              createNFT(name, price, image, description, router)
            }
            classStyle={Style.upload_box_btn_style}
          />
          <a href="#NFT-preview">
            <Button
              btnName="Preview"
              handleClick={() => {}}
              classStyle={Style.upload_box_btn_style}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default UloadNFT;
