import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Space } from "antd";

import "./index.scss";
import { imagesSearch } from "../../../redux/actions";

const { Search } = Input;

export const InputSearch = ({ setToggleLoading }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onSearch = (value) => {
    setToggleLoading(true);
    dispatch(imagesSearch(value));

    form.resetFields();
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
