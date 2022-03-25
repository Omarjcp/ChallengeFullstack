import { useState } from "react";

import { Spin } from "antd";

import "./index.scss";

export const LoadingComponent = () => {
  return (
    <div className="containerLoading">
      <Spin tip="Loading..." size="large" />
    </div>
  );
};
