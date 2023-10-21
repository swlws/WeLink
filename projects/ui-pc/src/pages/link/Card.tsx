import { SiteRecord } from "@/typing";
import dayjs from "dayjs";
import styles from "./index.module.scss";
import { upsertOneLink } from "@/api/site_link";
import { useState } from "react";

const renderTime = (timestamp?: number) =>
  timestamp ? (
    <span>{dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss")}</span>
  ) : null;

export default function Card(props: {
  record: SiteRecord;
  rm: (row: SiteRecord) => void;
  "data-index": number;
}) {
  const { record } = props;
  const [starStyle, setStarStyle] = useState(() => ({
    color: record.star ? "orange" : "#999",
    padding: "0 5px 0 0",
  }));

  const rm = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.rm(props.record);
  };

  const dragStart = (e: React.DragEvent, uuid: string) => {
    e.dataTransfer.setData("uuid", uuid);
  };
  const dragEvent = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const toggleStar = (e: React.MouseEvent) => {
    e.stopPropagation();

    record.star = !record.star;

    setStarStyle({
      color: record.star ? "orange" : "#999",
      padding: "0 5px 0 0",
    });

    upsertOneLink(record);
  };

  return (
    <section
      className={styles.card}
      data-proxy
      data-index={props["data-index"]}
      draggable="true"
      onDragStart={(e) => dragStart(e, record.uuid)}
      onDrag={dragEvent}
    >
      <header>
        <header>
          <i
            style={starStyle}
            className="iconfont icon-star-fill"
            onClick={toggleStar}
          ></i>
        </header>
        <main>{record.title}</main>
        <aside>
          <i
            onClick={rm}
            className=" iconfont icon-delete"
            style={{ color: "red" }}
          ></i>
        </aside>
      </header>
      <main>
        <span>{record.url}</span>
      </main>
      <footer>
        <div>
          <span>{record.category}</span>
          <span className={styles.count}>访问数：{record.count}</span>
          {renderTime(record.last_access_time)}
          <span className={styles.del} onClick={rm}>
            <i className="iconfont icon-delete"></i>
          </span>
        </div>
      </footer>
    </section>
  );
}
