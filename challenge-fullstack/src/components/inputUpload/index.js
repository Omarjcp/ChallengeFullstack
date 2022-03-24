import { useState } from "react";

import { app } from "../../firebase/fb";

import { Form, Select, Button, Upload } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

export const InputUploadImage = () => {
  const [archivoURL, setArchivoURL] = useState("");

  const handleInputChange = async (e) => {
    const archivoRef = e.target.files[0];
    const storageRef = app.storage().ref();
    const archivoPath = storageRef.child(archivoRef.name);
    await archivoPath.put(archivoRef);

    console.log("archivo cargado", archivoRef.name);

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

    console.log("archivo cargado:", nombreArchivo, "url:", archivoURL);

    window.location = "/";
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
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
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          "input-number": 3,
          "checkbox-group": ["A", "B"],
          rate: 3.5,
        }}
      >
        <Form.Item label="Dragger">
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files" action="/upload.do">
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
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
