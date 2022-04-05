import { GoogleOutlined } from "@ant-design/icons";
import GoogleLogin from "react-google-login";
import "./index.scss";

export const GoogleLoginComp = ({ responseGoogle }) => {
  return (
    <>
      <span style={{ color: "grey" }}>Or continue with google</span>
      <GoogleLogin
        clientId="113771193924-l40g5aae2t8hrhmd4es25ngcn0hvi1gv.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            className="buttonGoogle"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <GoogleOutlined style={{ fontSize: "1.18rem", color: "grey" }} />
          </button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      ></GoogleLogin>
    </>
  );
};
