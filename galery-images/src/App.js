import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getUserForId, getUsers } from "./redux/actions";

import "antd/dist/antd.css";

import { LoadingComponent } from "./components/loading";
import { HeaderNav } from "./components/header";
import { Galery } from "./components/galery";
import { Footer } from "./components/footer";
import { CreateAccount } from "./components/CreateAccount";
import { SignInComponent } from "./components/SignIn";
import { ProfileUser } from "./components/profileUser";
import { EditProfile } from "./components/profileUser/editProfile";

import "./App.scss";

function App() {
  const dispatch = useDispatch();

  const [toggleLoading, setToggleLoading] = useState(true);
  let idUserStorage = localStorage.getItem("id");

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUserForId(idUserStorage));

    setTimeout(() => {
      setToggleLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {toggleLoading ? <LoadingComponent /> : <></>}
      <div style={{ overflowX: "hidden" }}>
        <Route
          path="/"
          render={() => <HeaderNav setToggleLoading={setToggleLoading} />}
        />
        <Route path="/createaccount" render={() => <CreateAccount />} />
        <Route path="/signin" render={() => <SignInComponent />} />

        <Route exact path="/" render={() => <Galery />} />
        <Route
          path="/myprofile/:id"
          render={() => <ProfileUser setToggleLoading={setToggleLoading} />}
        />
        <Route path="/editprofile/:id" render={() => <EditProfile />} />
      </div>
      <Route path="/" render={() => <Footer />} />
    </>
  );
}

export default App;
