import { useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Divider, Image } from "antd";
import { WithoutImage } from "../withoutImages";
import "./index.scss";
import { app } from "../../firebase/fb";
import { getData } from "../../hooks/getImages";

export const Galery = ({ imagesUploaded, setImagesUploaded, setDocuments }) => {
  const onDelete = async (e, name) => {
    e.preventDefault();
    const colectionRef = app.firestore().collection("archivos");
    await colectionRef.doc(name).delete();
    getData(app, setDocuments, setImagesUploaded);
  };
  return (
    <>
      {imagesUploaded.length === 0 ? (
        <WithoutImage />
      ) : (
        <div className="containerGalery">
          {imagesUploaded.map((doc, i) => (
            <div key={i} className="containerImage">
              <div className="info">
                <div className="containerButtonClose">
                  <CloseCircleOutlined
                    style={{
                      fontSize: "1.3rem",
                      color: "red",
                    }}
                    onClick={(e) => onDelete(e, doc.name)}
                  />
                </div>
                <div className="containerNameImage">
                  <h2 className="nameImage">{doc.name}</h2>
                </div>
              </div>
              <img src={doc.url} />
            </div>
          ))}
        </div>
      )}
      <Divider />
    </>
  );
};
