import React, { useState, useEffect } from "react";
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";

import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constant";

const fetchContract = async (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

const connectingWithSmartContract = async () => {
  try {
    const web3ModalInstance = new Wenb3Modal();
    const connection = await web3ModalInstance.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = await fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("Something went Wrong.....", error);
  }
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  const [currentAccount, setcurrentAccount] = useState("");
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const router = useRouter();

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum)
        return setError("Install MetaMask"), setOpenError(true);

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setcurrentAccount(accounts[0]);
      } else {
        // setError("No Account Found");
        // setOpenError(true);
      }
    } catch (error) {
      setError("Somenthing wrong while connectimg to wallet");
      setOpenError(true);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, [currentAccount]);

  const connectWallet = async () => {
    try {
      if (!window.ethereum)
        return setError("Install MetaMask"), setOpenError(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setcurrentAccount(accounts[0]);
    } catch (error) {
      setError("Error While Connecting to MetaMask Wallet");
      setOpenError(true);
    }
  };

  const uploadFileToPinata = async (file) => {
    if (!file) return setError("Please Upload a NFT"), setOpenError(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const pinataMetadata = JSON.stringify({
        name: file.name,
      });
      formData.append("pinataMetadata", pinataMetadata);

      const pinataOptions = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", pinataOptions);
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          },
        }
      );
      const ipfsURL = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      return ipfsURL;
    } catch (error) {
      setError("Error while Uploading to Pinata");
      setOpenError(true);
    }
  };

  const createNFT = async (name, price, image, description, router) => {
    if (!name || !description || !price || !image)
      return setError("Please Provide All Data"), setOpenError(true);

    const data = JSON.stringify({ name, description, image });
    // console.log("Data", data);
    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          },
        }
      );
      // console.log("res", res.data.IpfsHash);
      const ipfsURL = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      // console.log("IPFS URL", ipfsURL);
      await createSale(ipfsURL, price);
      router.push("/searchPage");
    } catch (error) {
      setError("Error while creating NFT");
      setOpenError(true);
    }
  };

  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      const price = ethers.utils.parseUnits(formInputPrice, "ether");
      const contract = await connectingWithSmartContract();
      // console.log("contract", contract);
      const listingPrice = await contract.getListingPrice();
      // console.log("listingPrice", listingPrice.toString());
      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.reSellToken(id, price, {
            value: listingPrice.toString(),
          });
      const tran = await transaction.wait();
      // console.log("tran", tran);
      router.push("/searchPage");
    } catch (error) {
      setError("Error while creating sales");
      setOpenError(true);
    }
  };

  useEffect(() => {
    if (currentAccount) {
      fetchNFT();
    }
  }, []);

  const fetchNFT = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      // console.log(provider);
      const contract = await fetchContract(provider);
      // console.log(contract);
      const data = await contract.fetchMarketItem();
      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            // console.log("tokenURI", tokenURI);
            const {
              data: { name, description, image },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );
      return items;
    } catch (error) {
      console.warn("Error getting NFTs", error);
      setError("Error while fetching NFT");
      setOpenError(true);
    }
  };

  const fetchMyNFTsOrListedNFTs = async (type) => {
    // console.log(type);
    try {
      const contract = await connectingWithSmartContract();
      const data =
        type === "fetechItemListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFT();
      // console.log("data", data);
      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );
      // console.log(type, "items", items);
      return items;
    } catch (error) {
      setError("Error while feteching listed NFT");
      setOpenError(true);
    }
  };

  const buyNFt = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });
      const tran = await transaction.wait();
      // console.log("buying NFT tran", tran);
      router.push("/my-nft");
    } catch (error) {
      console.log("Buy NFT Error", error);
      setError("Error while Buying NFTs.");
      setOpenError(true);
    }
  };

  return (
    <NFTMarketplaceContext.Provider
      value={{
        checkIfWalletConnected,
        connectWallet,
        uploadFileToPinata,
        createNFT,
        fetchNFT,
        createSale,
        fetchMyNFTsOrListedNFTs,
        buyNFt,
        currentAccount,
        setOpenError,
        setError,
        error,
        openError,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
