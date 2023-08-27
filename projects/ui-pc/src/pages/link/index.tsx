import { useState } from "react";
import styles from "./index.module.scss";
import useStorage from "@/use/useStorage";
import { handleDomEventProxy } from "@/util/dom";

type Record = {
  title: string;
  url: string;
  count: number;
};

export default function Link() {
  const CACHE_KEY = "site_list";
  const [getItem, setItem] = useStorage();

  const [list, setList] = useState<Record[]>(() => {
    return getItem(CACHE_KEY) || [];
  });
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const syncList = (list: Record[]) => {
    setList(list);
    setItem(CACHE_KEY, list);
  };

  const clear = () => {
    setTitle("");
    setUrl("");
  };

  const inputValueChange = (type: "title" | "url", value: string) => {
    if (type === "title") {
      setTitle(value);
    } else if (type === "url") {
      setUrl(value);
    }
  };

  const addRow = () => {
    if (!title || !url) return;

    list.push({ title, url, count: 0 });
    syncList([...list]);

    clear();
  };

  const rmRow = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    list.splice(index, 1);
    syncList([...list]);
  };

  const toSite = (e: React.MouseEvent) => {
    handleDomEventProxy(e, (target) => {
      if (!target) return;

      const { index } = target.dataset;
      const info = index ? list[parseInt(index)] : null;
      if (!info) return;

      if (!/^http/gi.test(info.url)) return;
      info.count = (info.count || 0) + 1;
      syncList([...list]);

      window.open(info.url);
    });
  };

  return (
    <article className={styles.container}>
      <header>
        <input
          type="text"
          placeholder="Title"
          value={title}
          checked
          onChange={(e) => inputValueChange("title", e.target.value)}
        />
        <input
          type="text"
          value={url}
          placeholder="URL"
          onChange={(e) => inputValueChange("url", e.target.value)}
        />

        <button onClick={addRow}>Add</button>
      </header>

      <main onClick={toSite}>
        {list.map((item, index) => {
          return (
            <div key={index} data-index={index} data-proxy>
              <span>{index + 1}.</span>
              <span className={styles.tag}>{item.count}</span>
              <span>【{item.title}】</span>
              <span>{item.url}</span>
              <span
                className={styles.del}
                onClick={(e) => rmRow(e, index)}
              ></span>
            </div>
          );
        })}
      </main>
    </article>
  );
}
