import { useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Divider, Image } from "antd";
import { WithoutImage } from "../withoutImages";
import "./index.scss";
import { app } from "../../firebase/fb";
import { getData } from "../../hooks/getImages";
import { useSelector } from "react-redux";

export const Galery = ({ imagesUploaded, setImagesUploaded, setDocuments }) => {
  let { allImages } = useSelector((state) => state);

  const onDelete = async (e, idImage) => {
    // e.preventDefault();
    // const colectionRef = app.firestore().collection("archivos");
    // await colectionRef.doc(name).delete();
    // getData(app, setDocuments, setImagesUploaded);
  };
  return (
    <>
      {allImages?.length === 0 ? (
        <WithoutImage />
      ) : (
        <div className="containerGalery">
          {allImages?.map((doc, i) => (
            <div key={i} className="containerImage">
              <div className="info">
                <div className="containerButtonClose">
                  {/* <CloseCircleOutlined
                    style={{
                      fontSize: "1.3rem",
                      color: "red",
                    }}
                    onClick={(e) => onDelete(e, doc?.id)}
                  /> */}
                </div>
                <div className="containerNameImage">
                  <span className="nameImage">{doc?.name}</span>
                  <label className="nameOwnerImage">{doc?.user?.name}</label>
                </div>
              </div>
              <img src={doc?.image} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
