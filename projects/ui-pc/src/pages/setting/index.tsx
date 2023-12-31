import { SiteRecord } from "@/typing";
import {
  Button,
  Collapse,
  type CollapseProps,
  Modal,
  Input,
  message,
} from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { stringToFile, toClipboard } from "@/util/tool";
import { batchAddLinks, clearLinks, getLinkList } from "@/api/site_link";

const { TextArea } = Input;

function SiteConfig(props: { keyName: string }) {
  const CACHE_KEY = props.keyName;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [config, setConfig] = useState("");
  const [list, setList] = useState<SiteRecord[]>([]);

  useEffect(() => {
    getLinkList().then(setList);
  }, []);

  const exportFile = () => {
    stringToFile(JSON.stringify(list), CACHE_KEY + ".txt");
  };

  const importConfig = async () => {
    try {
      const data = JSON.parse(config);
      await clearLinks();
      await batchAddLinks(data);
      setList(await getLinkList());

      setIsModalOpen(false);
    } catch (e) {
      message.warning("Must Be JSON");
    }
  };

  return (
    <article className={styles["site_config"]}>
      <main>
        <pre>{JSON.stringify(list, null, 2)}</pre>
      </main>
      <footer>
        <Button
          type="primary"
          onClick={() => toClipboard(JSON.stringify(list))}
        >
          拷贝配置
        </Button>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          导入
        </Button>
        <Button type="primary" onClick={exportFile}>
          导出
        </Button>
      </footer>

      <Modal
        title="导入配置"
        open={isModalOpen}
        onOk={() => importConfig()}
        onCancel={() => setIsModalOpen(false)}
      >
        <TextArea
          showCount
          style={{ height: 120, marginBottom: 24 }}
          onChange={(e) => setConfig(e.target.value)}
          placeholder="type config"
        />
      </Modal>
    </article>
  );
}

export default function Setting() {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "数据-链接",
      children: <SiteConfig keyName="site_list"></SiteConfig>,
    },
  ];

  return (
    <div className={styles.container}>
      <Collapse items={items} defaultActiveKey={["1"]} />
    </div>
  );
}
