import { getLinkList, upsertOneLink } from "@/api/site_link";
import { SiteRecord } from "@/typing";
import { useState } from "react";
import Card from "./Card";
import { handleDomEventProxy } from "@/util/dom";

import styles from "./index.module.scss";

export default function StarList() {
  const [renderedList, setRenderedList] = useState<SiteRecord[]>([]);

  getLinkList("精选").then((list) => {
    setRenderedList(list);
  });

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
    <article>
      <header>Star</header>
      <main onClick={toSite}>
        {renderedList.map((item, index) => (
          <Card record={item} key={index} data-index={index}></Card>
        ))}
      </main>
    </article>
  );
}
