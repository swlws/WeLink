import { DatePicker, Modal } from "antd";

import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useState } from "react";
import { v4 } from "uuid";

import styles from "./index.module.scss";
import { upsertOneLink } from "@/api/site_link";

type FieldType = {
  category: string;
  title?: string;
  url?: string;
  schedule?: string;
};

type AddLinkProps = {
  category: string; // 当前 Tab
  ok: () => void;
};

export default function AddLink(props: AddLinkProps) {
  const [visibility, setVisibility] = useState(false);
  const [form] = useForm();

  const handleOk = () => {
    form.validateFields().then((info) => {
      const schedule = info.schedule
        ? dayjs(info.schedule).format("YYYY-MM-DD")
        : undefined;

      upsertOneLink({
        ...info,
        schedule,
        create_time: +new Date(),
        uuid: v4(),
        count: 0,
      });

      props.ok();
      setVisibility(false);
    });
  };

  const handleCancel = () => {
    setVisibility(false);
  };

  return (
    <section className={styles["add-link"]}>
      <header onClick={() => setVisibility(true)}>
        <i className="iconfont icon-add"></i>
      </header>
      <Modal
        title="添加链接"
        open={visibility}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ category: props.category }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="分类："
            name="category"
            rules={[{ required: true, message: "必填项" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="标题："
            name="title"
            rules={[{ required: true, message: "必填项" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="URL："
            name="url"
            rules={[{ required: true, message: "必填项" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="日程：" name="schedule">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
}
