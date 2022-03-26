import { useEffect, useState } from "react";
import { app } from "./firebase/fb";

import "antd/dist/antd.css";
import { LoadingComponent } from "./components/loading";
import { HeaderNav } from "./components/header";
import { Galery } from "./components/galery";

import "./App.css";
import { Footer } from "./components/footer";

function App() {
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

    setTimeout(() => {
      setToggleLoading(false);
    }, 2500);
  }, []);
  console.log(documents);

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
