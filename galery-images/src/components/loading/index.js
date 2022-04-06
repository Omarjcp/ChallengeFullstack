import { useState } from "react";

import { Modal, Spin } from "antd";

import "./index.scss";
import { DashOutlined } from "@ant-design/icons";

export const LoadingComponent = () => {
  const antIcon = <DashOutlined style={{ fontSize: "3rem" }} spin />;
  return (
    <Modal centered visible={true} footer={null} closable={false} width="0">
      <Spin
        size="large"
        tip="Loading..."
        indicator={antIcon}
        style={{ color: "pink" }}
      />
    </Modal>
  );
};
