import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { HiOutlineMail } from "react-icons/hi";
import {
  MdOutlineContentCopy,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./Form.module.css";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext.js";
import { Button } from "../../components/componentsindex.js";

const Form = () => {
  const { currentAccount, setOpenError, setError } = useContext(
    NFTMarketplaceContext
  );
  const router = useRouter();

  if (!currentAccount) {
    console.log("currentAccount", currentAccount.toString());
    setError("Please connect your Wallet before Uploading your profile.");
    setOpenError(true);
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    description: "",
    walletaddress: currentAccount,
    socialMedia: {
      instagram: "",
      twitter: "",
      facebook: "",
    },
  });
  const [userData, setUserData] = useState();
  const [editMode, setEditMode] = useState(true);
  // console.log(formData);

  const validateForm = () => {
    if (!formData.walletaddress.trim()) {
      setError("Please Connect Wallet First");
      setOpenError(true);

      return false;
    }
    if (!formData.username.trim()) {
      setError("Please Fill Username");
      setOpenError(true);
      return false;
    }

    if (!formData.email.trim()) {
      setError("Please Fill Email");
      setOpenError(true);
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Invalid Email");
      setOpenError(true);
    }

    if (!formData.description.trim()) {
      setError("Please Fill Description");
      setOpenError(true);
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["instagram", "twitter", "facebook"].includes(name)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        socialMedia: {
          ...prevFormData.socialMedia,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  const api_url = "http://localhost:4000/api/v1/users";

  useEffect(() => {
    (async () => {
      try {
        // console.log("Fetching User Wallet Address...");
        const res = await axios.get(`${api_url}/${currentAccount}`);

        if (res.data.data) {
          setUserData(res.data.data);
          setEditMode(false);
        }
        console.log("user data", res);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [currentAccount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log("Submitted Form Data:", formData);
        const response = await axios.post(api_url, formData);
        console.log("Response from server: ", response);
        setError("Profile Uploaded Successfully.");
        setOpenError(true);
      } catch (error) {
        console.log("Error in Submission: ", error);
        setError(
          `An Error Occurred while uploading the profile. ${error.response.data.message}`
        );
        setOpenError(true);
      }
    }
  };

  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
        <form onSubmit={handleSubmit}>
          <div className={Style.Form_box_input}>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              placeholder="UserName"
              name="username"
              value={userData?.username || formData.username}
              readOnly={!editMode}
              onChange={handleChange}
              className={Style.Form_box_input_userName}
            />
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="email">Email</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <HiOutlineMail />
              </div>
              <input
                type="email"
                name="email"
                value={userData?.email || formData.email}
                readOnly={!editMode}
                onChange={handleChange}
                placeholder="Email*"
              />
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={userData?.description || formData.description}
              readOnly={!editMode}
              onChange={handleChange}
              id=""
              cols="30"
              rows="6"
              placeholder="something about yourself in few words"
            ></textarea>
          </div>

          {/* <div className={Style.Form_box_input}>
            <label htmlFor="website">Website</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>

              <input type="text" placeholder="website" />
            </div>
          </div> */}

          <div className={Style.Form_box_input_social}>
            <div className={Style.Form_box_input}>
              <label htmlFor="facebook">Facebook</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialFacebook />
                </div>
                <input
                  type="url"
                  name="facebook"
                  value={formData.socialMedia.facebook}
                  onChange={handleChange}
                  placeholder="facebook.com"
                />
              </div>
            </div>
            <div className={Style.Form_box_input}>
              <label htmlFor="Twitter">Twitter</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialTwitter />
                </div>
                <input
                  type="url"
                  placeholder="Twiiter Link"
                  name="twitter"
                  value={formData.socialMedia.twitter}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={Style.Form_box_input}>
              <label htmlFor="Instragram">Instragram</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialInstagram />
                </div>
                <input
                  type="url"
                  name="instagram"
                  value={formData.socialMedia.instagram}
                  onChange={handleChange}
                  placeholder="Instagram Link"
                />
              </div>
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="wallet">Wallet Address</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineAccountBalanceWallet />
              </div>
              <input type="text" placeholder={currentAccount} disabled />
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineContentCopy />
              </div>
            </div>
          </div>

          <div className={Style.Form_box_btn}>
            <Button
              btnName={userData ? "Update Details" : "Upload profile"}
              handleClick={() => {
                setEditMode(true);
              }}
              classStyle={Style.button}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
