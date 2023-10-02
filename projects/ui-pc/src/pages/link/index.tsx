import { useEffect, useRef, useState } from "react";
import { Button, Tabs, TabsProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SiteList from "./SiteList";
import AddCategory from "./AddCategory";
import styles from "./index.module.scss";

import {
  getCategoryList,
  addOneCateGory,
  getLinkList,
  upsertOneLink,
} from "@/api/site_link";

export default function LinkTabs() {
  const [list, setList] = useState<string[]>([]);
  const tabWrapperRef = useRef(null);

  useEffect(() => {
    getCategoryList().then((list) => setList(list));
  }, []);

  const [visibility, setVisibility] = useState(false);
  const addSuccess = (title: string) => {
    addOneCateGory(title).then((list) => {
      setList(list);
    });
  };

  const closeModel = () => setVisibility(false);

  const operations = {
    left: (
      <Button
        type="link"
        onClick={() => setVisibility(true)}
        icon={<PlusOutlined />}
      />
    ),
  };

  const [sign, updateState] = useState(false);
  const forceUpdate = () => updateState(() => !sign);
  const items: TabsProps["items"] = list.map((item) => ({
    key: item,
    label: item,
    children: <SiteList category={item} sign={sign} />,
  }));

  const dragOverEvent = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const dropEvent = async (event: React.DragEvent) => {
    event.preventDefault();

    const target = event.target as any;
    if (!target.classList.contains("ant-tabs-tab-btn")) return;

    const category = target.innerText;
    const uuid = event.dataTransfer.getData("uuid");

    const list = await getLinkList();
    const obj = list.find((item) => item.uuid === uuid);
    if (!obj) return;

    obj.category = category;
    await upsertOneLink(obj);

    forceUpdate();
  };

  return (
    <article
      className={styles.container}
      onDragOver={dragOverEvent}
      onDrop={dropEvent}
    >
      <div style={{ height: "100%" }} ref={tabWrapperRef}>
        <Tabs
          style={{ height: "100%" }}
          tabBarExtraContent={operations}
          defaultActiveKey="All"
          items={items}
        ></Tabs>
      </div>

      <AddCategory visibility={visibility} ok={addSuccess} close={closeModel} />
    </article>
  );
}
