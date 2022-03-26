import { useState } from "react";
import { Modal, Button } from "antd";
import { InputUploadImage } from "../header/inputUpload";

export const ButtomModalFile = ({ setToggleLoading, getData }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" size="large" onClick={() => setVisible(true)}>
        Upload Image
      </Button>
      <Modal
        title="Upload image and add label"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
        // width={1000}
      >
        <InputUploadImage
          setToggleLoading={setToggleLoading}
          setVisible={setVisible}
          getData={getData}
        />
      </Modal>
    </>
  );
};
