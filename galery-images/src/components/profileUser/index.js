import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { deleteImage, getUserForId } from "../../redux/actions";

import { Avatar, Button, Card, Divider, Tooltip } from "antd";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";

import { ButtomModalFile } from "../ButtonModalFile";
import { HeaderProfile } from "./headerProfile";

import Swal from "sweetalert2";

import "./index.scss";

const { Meta } = Card;

export const ProfileUser = ({ setToggleLoading }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userLogin, msgDeleteImage } = useSelector((state) => state);

  console.log(msgDeleteImage);

  const onDelete = (e, idImage) => {
    e.preventDefault();
    dispatch(deleteImage(idImage));
    dispatch(getUserForId(userLogin.id));

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Delete image successful",
      showConfirmButton: false,
      timer: 2000,
    });

    setTimeout(() => history.go(0), 2500);
  };

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
            <Tooltip title="Delete Image">
              <Button
                shape="round"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "transparent",
                }}
                onClick={(e) => onDelete(e, imagesData.id)}
                icon={<CloseOutlined style={{ color: "rgb(129, 46, 46)" }} />}
              />
            </Tooltip>
          </Card>
        ))}
      </div>
    </div>
  );
};
