import { useState } from "react";
import { app } from "../../../firebase/fb";

import { Form, Button, Upload, message, Input } from "antd";
import { InboxOutlined, PictureOutlined } from "@ant-design/icons";
import { getData } from "../../../hooks/getImages";

export const InputUploadImage = ({
  setVisible,
  setToggleLoading,
  setDocuments,
  setImagesUploaded,
}) => {
  const [archivoURL, setArchivoURL] = useState("");
  const [nameFile, setNameFile] = useState("");

  const [form] = Form.useForm();

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
    setToggleLoading(true);
    uploadFile(e);
    setTimeout(() => setToggleLoading(false), 1000);
  };

  const onChangeInputText = (e) => {
    setNameFile(e.target.value);
  };

  const onFinish = async (values) => {
    setToggleLoading(true);
    values.name = nameFile;
    form.resetFields();

    if (!nameFile) {
      message.error("El archivo debe tener un nombre");
      return;
    }
    const colectionRef = app.firestore().collection("archivos");
    const document = await colectionRef
      .doc(nameFile)
      .set({ name: nameFile, url: archivoURL });

    setVisible(false);
    getData(app, setDocuments, setImagesUploaded);
    setTimeout(() => {
      setToggleLoading(false);
      setVisible(false);
    }, 2000);
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
        <Form name="validate_other" form={form} onFinish={onFinish}>
          <Form.Item name="dragg">
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger name="files" accept="image/*">
                <p className="ant-upload-drag-icon">
                  <PictureOutlined style={{ color: "grey" }} />
                </p>
                <p className="ant-upload-text">
                  Click or drag image to this area to upload
                </p>
                <p className="ant-upload-hint">Only single upload.</p>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item name="name" getValueFromEvent={onChangeInputText}>
              <Input
                style={{ marginTop: "2rem" }}
                type="text"
                name="nameInput"
                maxLength={30}
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
