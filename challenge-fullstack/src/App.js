import { useEffect, useState } from "react";
import { app } from "./firebase/fb";

import "./App.css";

function App() {
  const [archivoURL, setArchivoURL] = useState("");
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const documentsList = await app.firestore().collection("archivos").get();
      setDocuments(documentsList.docs.map((doc) => doc.data()));
    };
    getData();
  }, []);

  const handleInputChange = async (e) => {
    const archivoRef = e.target.files[0];
    const storageRef = app.storage().ref();
    const archivoPath = storageRef.child(archivoRef.name);
    await archivoPath.put(archivoRef);

    // console.log("archivo cargado", archivoRef.name);

    const enlaceUrl = await archivoPath.getDownloadURL();
    setArchivoURL(enlaceUrl);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const nombreArchivo = e.target.name.value;
    if (!nombreArchivo) {
      alert("El archivo debe tener un nombre");
      return;
    }
    const colectionRef = app.firestore().collection("archivos");
    const document = await colectionRef
      .doc(nombreArchivo)
      .set({ name: nombreArchivo, url: archivoURL });

    // console.log("archivo cargado:", nombreArchivo, "url:", archivoURL);

    window.location = "/";
  };

  const onDelete = async (e, name) => {
    e.preventDefault();
    const colectionRef = app.firestore().collection("archivos");
    await colectionRef.doc(name).delete();
    window.location = "/";
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={handleInputChange}
          type="file"
          // name="image"
          // accept="image/"
          // multiple
        />
        <input type="text" name="name" placeholder="nombra tu imagen" />
        <button>Enviar</button>
      </form>
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
  );
}

export default App;
