import { useEffect, useState } from "react";
import { app } from "./firebase/fb";
import { useDispatch, useSelector } from "react-redux";

import "antd/dist/antd.css";
import { LoadingComponent } from "./components/loading";
import { HeaderNav } from "./components/header";
import { Galery } from "./components/galery";
import { Footer } from "./components/footer";

import "./App.scss";
import { getUsers } from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  let { usersLength, allUsers } = useSelector((state) => state);

  const [toggleLoading, setToggleLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [imagesUploaded, setImagesUploaded] = useState([]);

  const getData = async () => {
    const documentsList = await app.firestore().collection("archivos").get();
    setDocuments(documentsList.docs.map((doc) => doc.data()));
    setImagesUploaded(documentsList.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getData();
    dispatch(getUsers());

    setTimeout(() => {
      setToggleLoading(false);
    }, 2500);
  }, []);

  console.log(usersLength, allUsers);

  const onDelete = async (e, name) => {
    e.preventDefault();
    const colectionRef = app.firestore().collection("archivos");
    await colectionRef.doc(name).delete();
    getData();
  };

  return (
    <>
      {toggleLoading ? <LoadingComponent /> : <></>}
      <div style={{ overflowX: "hidden" }}>
        <HeaderNav
          setToggleLoading={setToggleLoading}
          documents={documents}
          getData={getData}
          setImagesUploaded={setImagesUploaded}
        />

        <Galery imagesUploaded={imagesUploaded} onDelete={onDelete} />
      </div>
      <Footer />
    </>
  );
}

export default App;
