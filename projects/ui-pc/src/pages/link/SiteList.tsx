import { delOneLink, getLinkList, upsertOneLink } from "@/api/site_link";
import { SiteRecord } from "@/typing";
import { handleDomEventProxy } from "@/util/dom";
import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import Card from "./Card";
import styles from "./index.module.scss";

type SiteListProps = {
  category: string;
  sign: boolean;
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
    getLinkList(props.category).then((list) => {
      setRenderedList(list);
    });
  };

  useEffect(resetRenderedList, [props.category, props.sign]);

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
      info.last_access_time = +new Date();

      window.open(info.url);

      upsertOneLink(info).then(resetRenderedList);
    });
  };

  return (
    <article className={styles["site-list"]}>
      <main onClick={toSite}>
        {renderedList.map((item, index) => (
          <Card record={item} rm={rmRow} key={index} data-index={index}></Card>
        ))}
      </main>
    </article>
  );
}
