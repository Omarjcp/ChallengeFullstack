import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Divider, Image } from "antd";
import { WithoutImage } from "../withoutImages";
import "./index.scss";
import { app } from "../../firebase/fb";
import { getData } from "../../hooks/getImages";
import { getImages } from "../../redux/actions";

export const Galery = () => {
  const dispatch = useDispatch();
  let { allImages } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getImages());
  }, []);

  return (
    <>
      {allImages?.length === 0 ? (
        <WithoutImage />
      ) : (
        <div className="containerGalery">
          {allImages?.map((doc, i) => (
            <div key={i} className="containerImage">
              <div className="info">
                <div className="containerButtonClose"></div>
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
