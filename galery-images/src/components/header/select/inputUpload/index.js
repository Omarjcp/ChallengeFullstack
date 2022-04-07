import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Form, Button, Upload, message, Input } from "antd";
import { InboxOutlined, PictureOutlined } from "@ant-design/icons";
import { app } from "../../../../firebase/fb";
import { getData } from "../../../../hooks/getImages";
import { createImage, msgClear } from "../../../../redux/actions";

export const InputUploadImage = ({
  setVisible,
  setToggleLoading,
  setDocuments,
  setImagesUploaded,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { msgCreateImage, userLogin } = useSelector((state) => state);

  const [imageStorage, setImageStorage] = useState({});

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

  // const uploadFile = async (e) => {
  // const archivoRef = e?.file?.originFileObj;
  // const storageRef = app?.storage()?.ref();
  // const archivoPath = storageRef?.child(archivoRef?.uid);
  // await archivoPath?.put(archivoRef);

  // const enlaceUrl = await archivoPath?.getDownloadURL();
  // setArchivoURL(enlaceUrl);
  // };

  const normFile = (e) => {
    setToggleLoading(true);
    setImageStorage(e);
    setTimeout(() => setToggleLoading(false), 1000);
  };

  const onFinish = async (values) => {
    setToggleLoading(true);
    const archivoRef = imageStorage?.file?.originFileObj;
    const storageRef = app?.storage()?.ref();
    const archivoPath = storageRef?.child(archivoRef?.uid);
    await archivoPath?.put(archivoRef);

    const enlaceUrl = await archivoPath?.getDownloadURL();

    if (enlaceUrl) {
      values.image = enlaceUrl;
      values.userId = userLogin.id;
      console.log(values);
      form.resetFields();
      setToggleLoading(false);
      console.log("values form create", values);
      dispatch(createImage(values));
      setVisible(false);
      // history.go(0);
    }
  };
  if (msgCreateImage) {
    message.info(msgCreateImage);
    dispatch(msgClear());
    setTimeout(() => history.push("/"), 1000);
  }

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
          {/* <Form.Item name="dragg"> */}
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
            // rules={[
            //   {
            //     required: true,
            //     message: "Image is required",
            //   },
            // ]}
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

          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
            // getValueFromEvent={onChangeInputText}
            style={{ marginTop: "2rem" }}
          >
            <Input maxLength={30} placeholder="Nombre de tu imagen" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Description is required",
              },
            ]}
            // getValueFromEvent={onChangeInputText}
          >
            <Input maxLength={100} placeholder="Descripcion de tu imagen" />
          </Form.Item>
          {/* </Form.Item> */}

          <Form.Item
            wrapperCol={{
              span: 10,
              offset: 7,
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
