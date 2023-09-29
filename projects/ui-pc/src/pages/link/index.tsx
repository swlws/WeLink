import { useEffect, useState } from "react";

import { Button, Tabs, TabsProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SiteList from "./SiteList";
import AddCategory from "./AddCategory";
import useApi from "./useApi";

export default function LinkTabs() {
  const { getCategoryList, addOneCateGory } = useApi();

  const [list, setList] = useState<string[]>([]);
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

  const items: TabsProps["items"] = list.map((item) => ({
    key: item,
    label: item,
    children: <SiteList category={item} />,
  }));

  return (
    <article style={{ height: "100%" }}>
      <Tabs
        style={{ height: "100%" }}
        tabBarExtraContent={operations}
        defaultActiveKey="Default"
        items={items}
      ></Tabs>
      <AddCategory visibility={visibility} ok={addSuccess} close={closeModel} />
    </article>
  );
}
