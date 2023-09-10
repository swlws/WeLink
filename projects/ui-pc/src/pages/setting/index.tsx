import { SiteRecord } from "@/typing";
import useStorage from "@/use/useStorage";
import { Button, Collapse, type CollapseProps } from "antd";
import { useState } from "react";
import styles from "./index.module.scss";
import { stringToFile } from "@/util/tool";

function SiteConfig(props: { keyName: string }) {
  const CACHE_KEY = props.keyName;
  const [getItem] = useStorage();

  const [list] = useState<SiteRecord[]>(() => {
    return getItem(CACHE_KEY) || [];
  });
  const exportFile = () => {
    console.log("log");
    stringToFile(JSON.stringify(list), CACHE_KEY + ".txt");
  };

  return (
    <article className={styles["site_config"]}>
      <main>
        <pre>{JSON.stringify(list, null, 2)}</pre>
      </main>
      <footer>
        <Button type="primary" onClick={exportFile}>
          导出
        </Button>
      </footer>
    </article>
  );
}

export default function Setting() {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "站点配置-Tab",
      children: <SiteConfig keyName="site_category"></SiteConfig>,
    },
    {
      key: "2",
      label: "站点配置-List",
      children: <SiteConfig keyName="site_list"></SiteConfig>,
    },
  ];

  return (
    <div className={styles.container}>
      <Collapse items={items} defaultActiveKey={["1"]} />
    </div>
  );
}
