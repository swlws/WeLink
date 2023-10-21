import { getCategoryList, getLinkList, upsertOneLink } from "@/api/site_link";
import { Tabs, TabsProps } from "antd";
import { useEffect, useRef, useState } from "react";
import AddCategory from "./AddCategory";
import AddLink from "./AddLink";
import SiteList from "./SiteList";
import styles from "./index.module.scss";

function useActiveKey(): [string, (v: string) => void] {
  const [activeKey, selectedKey] = useState("All");

  return [activeKey, (v: string) => selectedKey(v)];
}

export default function LinkTabs() {
  const [activeKey, setActiveKey] = useActiveKey();
  const [list, setList] = useState<string[]>([]);
  const [sign, updateState] = useState(false);
  const forceUpdate = () => updateState(() => !sign);

  const tabWrapperRef = useRef(null);

  useEffect(() => {
    getCategoryList().then((list) => setList(list));
  }, []);

  const operations = {
    // 添加分类
    left: <AddCategory ok={setList} />,
  };

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
      {/* Tab */}
      <div style={{ height: "100%" }} ref={tabWrapperRef}>
        <Tabs
          style={{ height: "100%" }}
          destroyInactiveTabPane
          tabBarExtraContent={operations}
          defaultActiveKey={activeKey}
          items={items}
          onChange={setActiveKey}
        ></Tabs>
      </div>

      {/* 添加链接 */}
      <AddLink category={activeKey} ok={forceUpdate} />
    </article>
  );
}
