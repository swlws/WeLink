import { useEffect, useState } from "react";

import useStorage from "@/use/useStorage";
import { Button, Tabs, TabsProps, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SiteList from "./SiteList";
import AddCategory from "./AddCategory";

export default function LinkTabs() {
  const CACHE_KEY = "site_category";
  const [getItem, setItem] = useStorage();
  const [messageApi] = message.useMessage();

  const [list, setList] = useState<string[]>(() => {
    return getItem(CACHE_KEY) || [];
  });

  const syncList = (list: string[]) => {
    setList(list);
    setItem(CACHE_KEY, list);
  };

  const [visibility, setVisibility] = useState(false);
  const addSuccess = (title: string) => {
    if (list.includes(title)) {
      return messageApi.open({
        type: "warning",
        content: `类型【${title}】已经存在`,
      });
    }

    syncList([...list, title]);
  };

  const closeModel = () => {
    setVisibility(false);
  };

  useEffect(() => {
    if (list.length === 0) {
      setList(["All"]);
    }
  }, [list]);

  const operations = {
    left: (
      <Button
        type="link"
        onClick={() => setVisibility(true)}
        icon={<PlusOutlined />}
      />
    ),
  };

  const items: TabsProps["items"] = list.map((item) => ({
    key: item,
    label: item,
    children: <SiteList category={item} />,
  }));

  return (
    <article>
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey="Default"
        items={items}
      ></Tabs>

      <AddCategory visibility={visibility} ok={addSuccess} close={closeModel} />
    </article>
  );
}
