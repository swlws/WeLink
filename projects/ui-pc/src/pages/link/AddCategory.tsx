import { Input, Modal } from "antd";
import { useState } from "react";

type AddCategoryProps = {
  visibility: boolean;
  ok: (title: string) => void;
  close: () => void;
};

/**
 * 添加类型
 *
 * @param props
 * @returns
 */
export default function AddCategory(props: AddCategoryProps) {
  const [value, setValue] = useState("");

  const clear = () => {
    setValue("");
  };
  const handleOk = () => {
    props.ok(value);
    props.close();
    clear();
  };

  const handleCancel = () => {
    props.close();
    clear();
  };

  return (
    <Modal
      title="添加分类"
      open={props.visibility}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </Modal>
  );
}
