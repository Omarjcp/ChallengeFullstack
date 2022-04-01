import { Form, Input, Space } from "antd";

import "./index.scss";

const { Search } = Input;

export const InputSearch = ({
  documents,
  setImagesUploaded,
  setToggleLoading,
}) => {
  const [form] = Form.useForm();

  const onSearch = (value) => {
    setToggleLoading(true);
    let imagesFilter = documents.filter((image) => {
      if (image.name.toLowerCase().includes(value.toLowerCase())) return image;
    });

    form.resetFields();
    setImagesUploaded(imagesFilter);
    setTimeout(() => setToggleLoading(false), 1000);
  };

  return (
    <div className="inputSearch">
      <Form form={form}>
        <Form.Item name="search">
          <Search
            placeholder="Search image for name"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
