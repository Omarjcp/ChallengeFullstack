import { useHistory } from "react-router-dom";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Row } from "antd";
import "./index.scss";

export const HeaderProfile = ({ userLogin }) => {
  const history = useHistory();
  return (
    <div className="containerHeaderProfile">
      {/* <div className="secondContainerHeaderProfile"> */}
      <Avatar
        size={64}
        src={userLogin?.photo}
        icon={userLogin?.photo ? false : <UserOutlined />}
      />
      <div className="containerDescriptionProfile">
        <span
          style={{ fontSize: "2rem", fontWeight: "400", marginRight: "2rem" }}
        >
          {userLogin?.name}
        </span>
        <Button
          type="text"
          onClick={() => history.push("/editprofile/" + userLogin?.id)}
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
          {userLogin?.email}
        </label>
        {userLogin?.phone ? (
          <>
            <br />
            <label style={{ fontSize: ".7rem", color: "grey" }}>
              {userLogin?.phone}
            </label>
          </>
        ) : (
          <></>
        )}
        <br />
        <br />
        <p>{userLogin?.bio}</p>
      </div>
      {/* </div> */}
    </div>
  );
};
