import React, { useState } from "react";
import { RiAwardLine, RiAccountBoxFill } from "react-icons/ri";

//INTERNAL IMPORT
import Style from "./FollowerTab.module.css";
import FollowerTabCard from "./FollowerTabCard/FollowerTabCard";

const FollowerTab = ({ TopCreator, NftCreated }) => {
  const [popular, setPopular] = useState(true);
  const [following, setFollowing] = useState(false);
  const openPopular = () => {
    if (!popular) {
      setPopular(true);
      setFollowing(false);
    }
  };
  const openFollower = () => {
    if (!following) {
      setPopular(false);
      setFollowing(true);
    }
  };

  return (
    <div className={Style.followerTab}>
      <div className={Style.followerTab_title}>
        <h2> Top Creators List..</h2>
        <div className={Style.followerTab_tabs}>
          <div className={Style.followerTab_tabs_btn}>
            <button onClick={() => openPopular()}>
              <RiAwardLine /> Popular
            </button>
            <button onClick={() => openFollower()}>
              <RiAccountBoxFill /> NFT Created
            </button>
          </div>
        </div>
      </div>

      {popular && (
        <div className={Style.followerTab_box}>
          {TopCreator.map((el, i) => (
            <FollowerTabCard key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}

      {following && (
        <div className={Style.followerTab_box}>
          {NftCreated.map((el, i) => (
            <FollowerTabCard key={i + 1} i={i} el={el} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowerTab;
