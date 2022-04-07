import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { app } from "./firebase/fb";
import { useDispatch, useSelector } from "react-redux";

import "antd/dist/antd.css";
import { LoadingComponent } from "./components/loading";
import { HeaderNav } from "./components/header";
import { Galery } from "./components/galery";
import { Footer } from "./components/footer";

import "./App.scss";
import { getImages, getUserForId, getUsers } from "./redux/actions";
import { getData } from "./hooks/getImages";
import { CreateAccount } from "./components/CreateAccount";
import { SignInComponent } from "./components/SignIn";
import { ProfileUser } from "./components/profileUser";

function App() {
  const dispatch = useDispatch();
  let { usersLength, allUsers, allImages, userLogin } = useSelector(
    (state) => state
  );

  const [toggleLoading, setToggleLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [imagesUploaded, setImagesUploaded] = useState([]);
  let idUserStorage = localStorage.getItem("id");

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUserForId(idUserStorage));

    dispatch(getImages());

    setTimeout(() => {
      setToggleLoading(false);
    }, 2500);
  }, []);

  return (
    <>
      {toggleLoading ? <LoadingComponent /> : <></>}
      <div style={{ overflowX: "hidden" }}>
        <Route
          path="/"
          render={() => (
            <HeaderNav
              setToggleLoading={setToggleLoading}
              documents={documents}
              setImagesUploaded={setImagesUploaded}
              setDocuments={setDocuments}
            />
          )}
        />
        <Route path="/createaccount" render={() => <CreateAccount />} />
        <Route path="/signin" render={() => <SignInComponent />} />

        <Route
          exact
          path="/"
          render={() => (
            <Galery
              imagesUploaded={imagesUploaded}
              setImagesUploaded={setImagesUploaded}
              setDocuments={setDocuments}
            />
          )}
        />
        <Route
          path="/myprofile/:id"
          render={() => (
            <ProfileUser
              setToggleLoading={setToggleLoading}
              userLogin={userLogin}
            />
          )}
        />
      </div>
      <Route path="/" render={() => <Footer />} />
    </>
  );
}

export default App;
