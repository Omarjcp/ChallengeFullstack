import { useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Divider, Image } from "antd";
import { WithoutImage } from "../withoutImages";
import "./index.scss";

export const Galery = ({ imagesUploaded, onDelete }) => {
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
