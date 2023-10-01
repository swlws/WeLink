import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "./index.module.scss";
import { handleDomEventProxy } from "@/util/dom";
import { Input, Button } from "antd";
import { SiteRecord } from "@/typing";
import Card from "./Card";
import { v4 } from "uuid";
import { getLinkList, upsertOneLink, delOneLink } from "@/api/site_link";

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
  const [renderedList, setRenderedList] = useState<SiteRecord[]>([]);

  const resetRenderedList = () => {
    console.log("call resetRenderedList");
    getLinkList(props.category).then((list) => {
      setRenderedList(list);
    });
  };

  useEffect(resetRenderedList, []);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

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

    const info = {
      title,
      url,
      count: 0,
      category: props.category,
      create_time: dayjs().toISOString(),
      uuid: v4(),
    };
    upsertOneLink(info).then(() => {
      resetRenderedList();
      clear();
    });
  };

  const rmRow = (row: SiteRecord) => {
    delOneLink(row).then(resetRenderedList);
  };

  const toSite = (e: React.MouseEvent) => {
    handleDomEventProxy(e, (target) => {
      if (!target) return;

      const { index } = target.dataset;
      const info = index ? renderedList[parseInt(index)] : null;
      if (!info) return;

      if (!/^http/gi.test(info.url)) return;
      info.count = (info.count || 0) + 1;
      info.last_access_time = dayjs().toISOString();

      window.open(info.url);

      upsertOneLink(info).then(resetRenderedList);
    });
  };

  return (
    <article className={styles["site-list"]}>
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
        {renderedList.map((item, index) => (
          <Card record={item} rm={rmRow} key={index} data-index={index}></Card>
        ))}
      </main>
    </article>
  );
}
