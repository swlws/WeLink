import { addOneCateGory } from "@/api/site_link";
import { Input, Modal } from "antd";
import { useState } from "react";
import styles from "./index.module.scss";

type AddCategoryProps = {
  ok: (list: string[]) => void;
};

/**
 * 添加类型
 *
 * @param props
 * @returns
 */
export default function AddCategory(props: AddCategoryProps) {
  const [visibility, setVisibility] = useState(false);
  const [value, setValue] = useState("");

  const handleOk = () => {
    addOneCateGory(value).then((list) => {
      console.log("--", list, props.ok);
      props.ok([...list]);
      setVisibility(false);
    });
  };

  const handleCancel = () => {
    setVisibility(false);
  };

  return (
    <section
      className={styles["add-category"]}
      style={{ padding: "0 10px", cursor: "pointer" }}
    >
      <header onClick={() => setVisibility(true)}>
        <i className="iconfont icon-add"></i>
      </header>

      <Modal
        title="添加分类"
        open={visibility}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
      </Modal>
    </section>
  );
}
