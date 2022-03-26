import { Avatar } from "antd";
import imageAvatar from "./meCaricature.png";

import "./index.scss";

export const OwnerPage = () => {
  return (
    <div className="containerOwnerMain">
      <a href="https://github.com/Omarjcp" target="_blank">
        <Avatar src={imageAvatar} />
      </a>
      <div className="containerNames">
        <span style={{ fontWeight: "700", fontSize: "1rem" }}>My Unsplash</span>
        {/* <span style={{ fontWeight: "600", fontSize: ".6rem" }}>
          Omar Castillo
        </span> */}
        <span style={{ fontWeight: "500", color: "grey", fontSize: ".6rem" }}>
          devChallenges.io
        </span>
      </div>
    </div>
  );
};
