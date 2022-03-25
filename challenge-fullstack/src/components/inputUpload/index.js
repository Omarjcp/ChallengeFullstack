import { useState } from "react";

import { app } from "../../firebase/fb";

import { Form, Select, Button, Upload, Alert, message } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
const { Option } = Select;

export const InputUploadImage = ({ setToggleLoading, setVisible }) => {
  const [archivoURL, setArchivoURL] = useState("");
  const [nameFile, setNameFile] = useState("");

  // const handleInputChange = async (e) => {
  //   const archivoRef = e.target.files[0];
  //   const storageRef = app.storage().ref();
  //   const archivoPath = storageRef.child(archivoRef.name);
  //   await archivoPath.put(archivoRef);

  //   console.log("archivo cargado", archivoRef.name);

  //   const enlaceUrl = await archivoPath.getDownloadURL();
  //   setArchivoURL(enlaceUrl);
  // };

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   const nombreArchivo = e.target.name.value;
  //   if (!nombreArchivo) {
  //     alert("El archivo debe tener un nombre");
  //     return;
  //   }
  //   const colectionRef = app.firestore().collection("archivos");
  //   const document = await colectionRef
  //   .doc(nombreArchivo)
  //   .set({ name: nombreArchivo, url: archivoURL });

  //   console.log("archivo cargado:", nombreArchivo, "url:", archivoURL);

  //   window.location = "/";
  // };

  const uploadFile = async (e) => {
    const archivoRef = e?.file?.originFileObj;
    const storageRef = app?.storage()?.ref();
    const archivoPath = storageRef?.child(archivoRef?.name);
    await archivoPath?.put(archivoRef);

    console.log("archivo cargado", archivoRef.name);

    const enlaceUrl = await archivoPath?.getDownloadURL();
    setArchivoURL(enlaceUrl);
  };

  const normFile = (e) => {
    uploadFile(e);
  };

  const onChangeInputText = (e) => {
    setNameFile(e.target.value);
  };

  const onFinish = async (values) => {
    setToggleLoading(true);
    setVisible(false);
    setTimeout(() => {
      setToggleLoading(false);
    }, 1000);
    values.name = nameFile;

    if (!nameFile) {
      message.error("El archivo debe tener un nombre");
      return;
    }
    const colectionRef = app.firestore().collection("archivos");
    const document = await colectionRef
      .doc(nameFile)
      .set({ name: nameFile, url: archivoURL });

    console.log("Received values of form: ", values);
  };

  return (
    <>
      <div>
        {/* <form onSubmit={onSubmit}>
        <input
          onChange={handleInputChange}
          type="file"
          // name="image"
          // accept="image/"
          // multiple
        />
        <input type="text" name="name" placeholder="nombra tu imagen" />
        <button>Enviar</button>
      </form> */}
        <Form name="validate_other" onFinish={onFinish}>
          <Form.Item>
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger name="files">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
              }}
              name="name"
              getValueFromEvent={onChangeInputText}
            >
              <input
                style={{ marginTop: "2rem" }}
                type="text"
                name="name"
                placeholder="Nombre de tu imagen"
              />
            </Form.Item>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 10,
              offset: 10,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
