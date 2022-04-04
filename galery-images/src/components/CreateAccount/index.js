import { useState } from "react";
import { GoogleLogin } from "react-google-login";

import { Form, Input, InputNumber, Button, Upload, message, Radio } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import "./index.scss";
import { app } from "../../firebase/fb";

export const CreateAccount = () => {
  const [dataUser, setDataUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [requiredMark, setRequiredMarkType] = useState("optional");

  const [form] = Form.useForm();

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  const handleChange = async (info) => {
    // Get this url from response in real world.
    setLoading(true);
    const archivoRef = info?.file?.originFileObj;
    const storageRef = app?.storage()?.ref();
    const archivoPath = storageRef?.child(archivoRef?.name);
    await archivoPath?.put(archivoRef);
    console.log("archivo cargado", archivoRef.name);
    const enlaceUrl = await archivoPath?.getDownloadURL();
    setImageUrl(enlaceUrl);

    setTimeout(() => setLoading(false), 3000);
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
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
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
        <Form.Item name={["user", "Bio"]} label="Bio">
          <Input.TextArea placeholder="Description of you" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <GoogleLogin
            clientId="113771193924-l40g5aae2t8hrhmd4es25ngcn0hvi1gv.apps.googleusercontent.com"
            buttonText="Sign up with google"
            style={{ backgroundColor: "red" }}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          ></GoogleLogin>
        </Form.Item>
      </Form>
    </div>
  );
};
