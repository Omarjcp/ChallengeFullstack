import { CloseCircleOutlined } from "@ant-design/icons";
import { Image } from "antd";
import "./index.scss";

export const Galery = ({ imagesUploaded, onDelete }) => {
  return (
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
  );
};
