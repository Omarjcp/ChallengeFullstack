import {
  GithubOutlined,
  LinkedinFilled,
  LinkedinOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";

export const Footer = () => {
  return (
    <>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        <p>
          Created by Omar Castillo{" "}
          {/* <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        > */}
          <a href="https://github.com/Omarjcp" target="_blank">
            <GithubOutlined style={{ fontSize: "1.3rem", color: "#4fc082" }} />
          </a>{" "}
          -{" "}
          <a
            href="https://www.linkedin.com/in/omar-jose-castillo/"
            target="_blank"
          >
            <LinkedinFilled style={{ fontSize: "1.3rem", color: "#4fc082" }} />
          </a>
          {/* </div> */}
        </p>
      </div>
    </>
  );
};
