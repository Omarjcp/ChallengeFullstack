import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { msgClear, signIn } from "../../redux/actions";

import { Form, Input, Button, message } from "antd";

import { GoogleLoginComp } from "../GoogleLogin";

import "./index.scss";

export const SignInComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { msgLogin } = useSelector((state) => state);

  const [form] = Form.useForm();

  const onFinish = ({ user }) => {
    dispatch(signIn(user));
  };

  if (msgLogin.length > 0) {
    if (
      msgLogin === "Login successfull" ||
      msgLogin === "Login with google successfull"
    ) {
      message.info("Login successfull");
      dispatch(msgClear());
      setTimeout(() => history.push("/"), 1000);
    } else {
      message.info("User existing");
      dispatch(msgClear());
    }
  }

  const responseGoogle = async (response) => {
    if (response) {
      dispatch(
        signIn({
          email: response.profileObj.email,
          name: response.profileObj.name
            ? response.profileObj.name
            : response.profileObj.email,
          photo: response.profileObj.imageUrl
            ? response.profileObj.imageUrl
            : "",
          isWithGoogle: true,
        })
      );
      history.push("/");
    }
  };

  return (
    <div className="container-form-sign-in">
      {localStorage.getItem("token") ? (
        <h1>You already logged in...</h1>
      ) : (
        <>
          <Form form={form} name="sign-in" onFinish={onFinish}>
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
              <Input type="password" placeholder="You password" />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ width: "100%", marginTop: ".5rem" }}
                type="primary"
                htmlType="submit"
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>
          <GoogleLoginComp responseGoogle={responseGoogle} />
          <span style={{ color: "grey", marginTop: "1.5rem" }}>
            Don't have an account yet? <Link to="/createaccount">Register</Link>
          </span>
        </>
      )}
    </div>
  );
};
