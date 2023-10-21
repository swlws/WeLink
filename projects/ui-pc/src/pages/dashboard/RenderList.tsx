import {
  getLinkList,
  getScheduleLinkList,
  upsertOneLink,
} from "@/api/site_link";
import { SiteRecord } from "@/typing";
import { useState } from "react";
import Card from "./Card";
import { handleDomEventProxy } from "@/util/dom";

import styles from "./index.module.scss";

type RenderListProps = {
  title: string;
  type: "star" | "top_click" | "schedule";
};

function useLoadData(type: RenderListProps["type"]) {
  const [renderedList, setRenderedList] = useState<SiteRecord[]>([]);

  switch (type) {
    case "star":
      {
        getLinkList("精选").then((list) => {
          setRenderedList(list);
        });
      }
      break;
    case "top_click":
      {
        getLinkList().then((list) => {
          setRenderedList(list.splice(0, 10));
        });
      }
      break;
    case "schedule":
      {
        getScheduleLinkList().then((list) => {
          setRenderedList(list.splice(0, 10));
        });
      }
      break;
    default:
      break;
  }

  return [renderedList];
}

export default function RenderList(props: RenderListProps) {
  const [renderedList] = useLoadData(props.type);

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

      upsertOneLink(info);
    });
  };

  return (
    <article className={styles["render-list"]}>
      <header>{props.title}</header>
      <main onClick={toSite}>
        {renderedList.map((item, index) => (
          <Card record={item} key={index} data-index={index}></Card>
        ))}
      </main>
    </article>
  );
}
