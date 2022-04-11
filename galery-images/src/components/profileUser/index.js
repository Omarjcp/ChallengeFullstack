import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Divider } from "antd";
import { getUserForId } from "../../redux/actions";
import { ButtomModalFile } from "../ButtonModalFile";
import { HeaderProfile } from "./headerProfile";

import "./index.scss";

const { Meta } = Card;

export const ProfileUser = ({ setToggleLoading, userLogin }) => {
  const dispatch = useDispatch();
  // const { userLogin } = useSelector((state) => state);

  // let idUserLogined = localStorage.getItem("id");
  // console.log(idUserLogined, "is storage");
  // console.log("User login", userLogin);

  // useEffect(() => {
  //   dispatch(getUserForId(idUserLogined));
  //   console.log("si entro en effect");
  // }, []);

  // console.log(userLogin);

  return (
    <div className="containerProfile">
      <HeaderProfile userLogin={userLogin} />
      <Divider />
      <ButtomModalFile setToggleLoading={setToggleLoading} />
      <div className="containerGaleryProfile">
        {userLogin?.images?.map((imagesData) => (
          <Card
            hoverable
            style={{
              display: "inline-block",
              maxWidth: 300,
              border: ".5px solid lightgrey",
              borderRadius: "5px",
              margin: "1rem",
              height: "100%",
            }}
            cover={
              <img
                alt={imagesData?.name}
                src={imagesData?.image}
                style={{
                  borderBottom: "0.1px solid lightgrey",
                }}
              />
            }
          >
            <Meta
              avatar={
                <Avatar
                  src={userLogin?.photo}
                  icon={userLogin?.photo ? false : <UserOutlined />}
                />
              }
              title={imagesData?.name}
              description={imagesData?.description}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};
