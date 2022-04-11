import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { app } from "../../../firebase/fb";
import { getUserForId, msgClear, updateUser } from "../../../redux/actions";

import { Form, Input, Button, Upload, message } from "antd";
import { CameraFilled, LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import "./index.scss";

export const EditProfile = ({ userLogin }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { msgUpdateUser } = useSelector((state) => state);

  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [form] = Form.useForm();

  const onFinish = ({ user }) => {
    dispatch(
      updateUser(userLogin.id, {
        email: user.email ? user.email : userLogin?.email,
        name: user.name ? user.name : userLogin?.name,
        password: user.password ? user.password : userLogin?.password,
        phone: user.phone ? user.phone : userLogin?.phone,
        photo: imageUrl ? imageUrl : userLogin?.photo,
        bio: user.bio ? user.bio : userLogin?.bio,
      })
    );
    dispatch(getUserForId(userLogin.id));

    form.resetFields();
  };

  const handleChange = async (info) => {
    setLoadingAvatar(true);
    const archivoRef = info?.file?.originFileObj;
    const storageRef = app?.storage()?.ref();
    const archivoPath = storageRef?.child(archivoRef?.uid);
    await archivoPath?.put(archivoRef);

    const enlaceUrl = await archivoPath?.getDownloadURL();

    setImageUrl(enlaceUrl);

    setTimeout(() => setLoadingAvatar(false), 3000);
  };

  console.log(msgUpdateUser);

  if (msgUpdateUser.length > 1) {
    message.info("User update successfull..");
    dispatch(msgClear());
    setTimeout(() => history.push("/myprofile/" + userLogin?.id), 1000);
  }

  return (
    <div className="container-form-edit-profile">
      <Form form={form} name="sign-up" onFinish={onFinish}>
        <Form.Item name={["user", "photo"]}>
          <Upload
            name="photo"
            className="avatar-uploader"
            accept="image/*"
            showUploadList={false}
            onChange={(e) => handleChange(e)}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{ width: "8rem", height: "8rem", borderRadius: "50%" }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "100%",
                  width: "100%",
                  borderRadius: "50%",
                  backgroundImage: `url(${userLogin.photo})`,
                  backgroundSize: "cover",
                }}
              >
                {/* <img src={} /> */}
                {loadingAvatar ? (
                  <LoadingOutlined />
                ) : (
                  <CameraFilled
                    style={{
                      fontSize: "1.7rem",
                      color: "#fff",
                      opacity: ".8",
                    }}
                  />
                )}
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item name={["user", "name"]} label="Name">
          <Input placeholder="Name or nickname" />
        </Form.Item>
        <Form.Item name={["user", "phone"]} label="phone" required={false}>
          <Input placeholder="Ej: 1187654321" />
        </Form.Item>
        <Form.Item name={["user", "bio"]} label="Bio">
          <Input.TextArea placeholder="Description of you" />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input placeholder="Ej: example@gmail.com" />
        </Form.Item>
        {!userLogin?.isWithGoogle ? (
          <Form.Item
            name={["user", "password"]}
            label="Password"
            rules={[{ min: 5, message: "Password required min 5 caracters" }]}
          >
            <Input type="password" placeholder="Remember you password" />
          </Form.Item>
        ) : (
          <></>
        )}
        <Form.Item>
          <Button
            style={{
              width: "100%",
            }}
            type="primary"
            htmlType="submit"
          >
            Update Info
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
