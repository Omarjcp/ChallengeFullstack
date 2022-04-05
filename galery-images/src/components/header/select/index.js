import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Menu, Dropdown, Avatar, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { ButtomModalFile } from "../../ButtonModalFile";
import { Link, useHistory } from "react-router-dom";

import "./index.scss";
import { logOut } from "../../../redux/actions";

export const SelectHeader = ({
  setToggleLoading,
  setDocuments,
  setImagesUploaded,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state);

  const logout = () => {
    console.log("logut");
    localStorage.clear();
    dispatch(logOut());
    history.push("/");
  };

  const menu = localStorage.getItem("token") ? (
    <Menu style={{ width: "10rem" }}>
      <Menu.Item key="0">
        <Link to={`/myprofile/${userLogin.id}`}>My profile</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Divider style={{ margin: ".3rem 0 .3rem 0" }} />

      <Menu.Item key="2" danger onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  ) : (
    <Menu>
      <Menu.Item key="0">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/signin">Sign in</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/createaccount">Create user</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <Avatar
            style={{ marginRight: ".5rem" }}
            src={
              userLogin?.photo
                ? userLogin?.photo
                : "https://joeschmoe.io/api/v1/random"
            }
          />
          {userLogin?.name || userLogin?.email
            ? userLogin?.name || userLogin?.email
            : ""}{" "}
          <DownOutlined />
        </a>
      </Dropdown>
      {/* <ButtomModalFile
            setToggleLoading={setToggleLoading}
            setDocuments={setDocuments}
            setImagesUploaded={setImagesUploaded}
          /> */}
    </>
  );
};
