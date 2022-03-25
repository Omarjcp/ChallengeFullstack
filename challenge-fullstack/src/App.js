import { useEffect, useState } from "react";
import { app } from "./firebase/fb";

import "antd/dist/antd.css";
import { InputUploadImage } from "./components/inputUpload";
import { LoadingComponent } from "./components/loading";
import { ButtomModalFile } from "./components/ButtonModalFile";

function App() {
  const [toggleLoading, setToggleLoading] = useState(true);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const documentsList = await app.firestore().collection("archivos").get();
      setDocuments(documentsList.docs.map((doc) => doc.data()));
    };
    getData();

    setTimeout(() => {
      setToggleLoading(false);
    }, 2500);
  }, []);

  const onDelete = async (e, name) => {
    e.preventDefault();
    const colectionRef = app.firestore().collection("archivos");
    await colectionRef.doc(name).delete();
    window.location = "/";
  };

  return (
    <>
      {toggleLoading ? <LoadingComponent /> : <></>}
      <div style={{ overflowX: "hidden" }}>
        <ButtomModalFile setToggleLoading={setToggleLoading} />

        <ul>
          {documents.map((doc, i) => (
            <li key={i}>
              <h3>{doc.name}</h3>{" "}
              <button onClick={(e) => onDelete(e, doc.name)}>X</button>
              <img src={doc.url} height="100px" width="100px" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
