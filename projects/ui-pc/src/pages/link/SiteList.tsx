import React, { useEffect, useState } from "react";

import styles from "./index.module.scss";
import useStorage from "@/use/useStorage";
import { handleDomEventProxy } from "@/util/dom";
import { Input, Button } from "antd";
import { SiteRecord } from "@/typing";

type SiteListProps = {
  category: string;
};

/**
 * 站点列表
 *
 * @param props
 * @returns
 */
export default function SiteList(props: SiteListProps) {
  const CACHE_KEY = "site_list";
  const [getItem, setItem] = useStorage();
  const [list, setList] = useState<SiteRecord[]>(() => {
    return getItem(CACHE_KEY) || [];
  });
  const [renderedList, setRenderedList] = useState<SiteRecord[]>([]);

  useEffect(() => {
    setRenderedList(
      list.filter((item) => {
        return ["All", item.category].includes(props.category);
      })
    );
  }, [list, props.category]);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const syncList = (list: SiteRecord[]) => {
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

    list.push({ title, url, count: 0, category: props.category });
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
        <Input
          prefix="Title"
          type="text"
          value={title}
          checked
          onChange={(e) => inputValueChange("title", e.target.value)}
        />
        <Input
          prefix="URL"
          type="text"
          value={url}
          onChange={(e) => inputValueChange("url", e.target.value)}
        />

        <Button onClick={addRow}>Add</Button>
      </header>

      <main onClick={toSite}>
        {renderedList.map((item, index) => {
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
