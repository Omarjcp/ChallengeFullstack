import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createUser, msgClear } from "../../redux/actions";

import { app } from "../../firebase/fb";
import { GoogleLoginComp } from "../GoogleLogin";

import { Form, Input, InputNumber, Button, Upload, message, Radio } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import "./index.scss";
import { useSelector } from "react-redux";

export const CreateAccount = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { msgCreatedUser } = useSelector((state) => state);

  const [dataUser, setDataUser] = useState({});
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const [form] = Form.useForm();

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const onFinish = ({ user }) => {
    dispatch(
      createUser({
        email: user.email,
        name: user.name,
        password: user.password,
        phone: user.phone,
        photo: imageUrl,
        bio: user.bio,
        isLoginWithGoogle: false,
      })
    );

    form.resetFields();
  };

  if (msgCreatedUser.length > 0) {
    if (msgCreatedUser === "User created successfull") {
      message.info("User created successfull");
      dispatch(msgClear());
      setTimeout(() => history.push("/signin"), 1000);
    } else {
      message.info("User existing");
      dispatch(msgClear());
    }
  }

  const handleChange = async (info) => {
    // Get this url from response in real world.
    setLoadingAvatar(true);
    const archivoRef = info?.file?.originFileObj;
    const storageRef = app?.storage()?.ref();
    const archivoPath = storageRef?.child(archivoRef?.name);
    await archivoPath?.put(archivoRef);
    console.log("archivo cargado", archivoRef.name);
    const enlaceUrl = await archivoPath?.getDownloadURL();
    setImageUrl(enlaceUrl);
    setTimeout(() => setLoadingAvatar(false), 3000);
  };

  const responseGoogle = async (response) => {
    if (response) {
      dispatch(
        createUser({
          email: response.profileObj.email,
          name: response.profileObj.name
            ? response.profileObj.name
            : response.profileObj.email,
          photo: response.profileObj.imageUrl
            ? response.profileObj.imageUrl
            : "",
          isLoginWithGoogle: true,
        })
      );
    }
  };

  return (
    <div className="container-form-sign-up">
      <Form
        form={form}
        name="sign-up"
        onFinish={onFinish}
        initialValues={{
          requiredMarkValue: requiredMark,
        }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
      >
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
                }}
              >
                {loadingAvatar ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: "1rem" }}>Upload Avatar</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[{ required: true, message: "Name is required field" }]}
          hasFeedback
          tooltip="Name is a required field"
        >
          <Input placeholder="Name or nickname" />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Email is required field",
            },
          ]}
          hasFeedback
          tooltip="Email is a required field"
        >
          <Input placeholder="Ej: example@gmail.com" />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          label="Password"
          rules={[
            { required: true, message: "Password is a required field" },
            { min: 5, message: "Password required min 5 caracters" },
          ]}
          hasFeedback
          tooltip="Password is a required field"
        >
          <Input type="password" placeholder="Remember you password" />
        </Form.Item>
        <Form.Item name={["user", "phone"]} label="phone" required={false}>
          <Input placeholder="Ej: 1187654321" />
        </Form.Item>
        <Form.Item name={["user", "bio"]} label="Bio">
          <Input.TextArea placeholder="Description of you" />
        </Form.Item>
        <Form.Item>
          <Button
            style={{
              width: "30%",
            }}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      <GoogleLoginComp responseGoogle={responseGoogle} />
      <span style={{ color: "grey" }}>
        Adready a member? <Link to="/signin">Login</Link>
      </span>
    </div>
  );
};
