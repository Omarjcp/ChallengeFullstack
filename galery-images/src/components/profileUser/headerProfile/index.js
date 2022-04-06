import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Row } from "antd";
import "./index.scss";

export const HeaderProfile = ({ userLogin }) => {
  return (
    <div className="containerHeaderProfile">
      {/* <div className="secondContainerHeaderProfile"> */}
      <Avatar
        size={64}
        src={userLogin.photo}
        icon={userLogin.photo ? false : <UserOutlined />}
      />
      <div className="containerDescriptionProfile">
        <span
          style={{ fontSize: "2rem", fontWeight: "400", marginRight: "5rem" }}
        >
          {userLogin.name}
        </span>
        <Button
          type="text"
          icon={<EditOutlined style={{ fontSize: "1.2rem" }} />}
          style={{
            width: "2.1rem",
            height: "2.1rem",
            border: "1px solid lightgrey",
            borderRadius: "4px",
          }}
        ></Button>

        <br />
        <label style={{ fontSize: ".7rem", color: "grey" }}>
          {userLogin.email}
        </label>
        <br />
        <br />
        <p>{userLogin.bio}</p>
      </div>
      {/* </div> */}
    </div>
  );
};
