import { Avatar, Card, Divider } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserForId } from "../../redux/actions";
import { ButtomModalFile } from "../ButtonModalFile";
import { HeaderProfile } from "./headerProfile";

import "./index.scss";

const { Meta } = Card;

export const ProfileUser = ({ setToggleLoading }) => {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state);

  let idUserLogined = localStorage.getItem("id");

  useEffect(() => {
    dispatch(getUserForId(idUserLogined));
  }, []);

  return (
    <div className="containerProfile">
      <HeaderProfile userLogin={userLogin} />
      <Divider />
      <ButtomModalFile setToggleLoading={setToggleLoading} />
      <div className="containerGaleryProfile">
        {userLogin?.images?.map((imagesData) => (
          // <div>
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
              avatar={<Avatar src={userLogin.photo} />}
              title={imagesData?.name}
              description={imagesData?.description}
            />
          </Card>
          //</div>
        ))}
      </div>
    </div>
  );
};
